'use client'

import { useEffect, useMemo, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { DayPicker, type DateRange } from 'react-day-picker'
import 'react-day-picker/style.css'
import { addMonths, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { SectionHead } from './ApartmentsSection'
import { apartamentos, toneColor } from '@/lib/data/apartments'

type Tipo = 'generica' | 'reserva'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontWeight: 'var(--fw-semibold)' as unknown as number,
  fontSize: 'var(--text-xs)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  display: 'block',
  marginBottom: 6,
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-base)',
  color: 'var(--text-body)',
  background: 'var(--surface-card)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-sm)',
  padding: '11px 14px',
  outline: 'none',
  boxSizing: 'border-box',
}

function fmt(d: Date) {
  return format(d, 'yyyy-MM-dd')
}

function ConsultaForm() {
  const searchParams = useSearchParams()

  const [tipo, setTipo] = useState<Tipo>('generica')
  const [apartamento, setApartamento] = useState<string>(apartamentos[0].slug)
  const [range, setRange] = useState<DateRange | undefined>()
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')

  const [fechasOcupadas, setFechasOcupadas] = useState<Set<string>>(new Set())
  const [cargandoDisponibilidad, setCargandoDisponibilidad] = useState(false)

  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [enviado, setEnviado] = useState(false)

  // Preselección vía ?apartamento=slug — cambia a la pestaña reserva y preselecciona.
  useEffect(() => {
    const preslug = searchParams.get('apartamento')
    if (preslug && apartamentos.some((a) => a.slug === preslug)) {
      setTipo('reserva')
      setApartamento(preslug)
    }
  }, [searchParams])

  useEffect(() => {
    if (tipo !== 'reserva') return
    setCargandoDisponibilidad(true)
    const inicio = fmt(new Date())
    const fin = fmt(addMonths(new Date(), 12))
    fetch(`/api/disponibilidad?apartamento=${apartamento}&inicio=${inicio}&fin=${fin}`)
      .then((r) => r.json())
      .then((data) => setFechasOcupadas(new Set<string>(data.fechas_ocupadas ?? [])))
      .catch(() => setFechasOcupadas(new Set()))
      .finally(() => setCargandoDisponibilidad(false))
  }, [tipo, apartamento])

  const disabledMatcher = useMemo(
    () => [
      { before: new Date() },
      (date: Date) => fechasOcupadas.has(fmt(date)),
    ],
    [fechasOcupadas]
  )

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
    setError(null)

    if (!nombre || !telefono || !email) {
      setError('Completa nombre, teléfono y email.')
      return
    }
    if (tipo === 'reserva' && (!range?.from || !range?.to)) {
      setError('Selecciona las fechas de tu estancia.')
      return
    }

    setEnviando(true)
    try {
      const res = await fetch('/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo,
          nombre,
          apellidos: apellidos || undefined,
          telefono,
          email,
          mensaje: mensaje || undefined,
          ...(tipo === 'reserva'
            ? {
                apartamento,
                fecha_checkin: range?.from ? fmt(range.from) : undefined,
                fecha_checkout: range?.to ? fmt(range.to) : undefined,
              }
            : {}),
        }),
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error || 'No se pudo enviar la consulta')
      }

      setEnviado(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo enviar la consulta. Inténtalo de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-7)',
          textAlign: 'center',
          maxWidth: 560,
          margin: '0 auto',
        }}
      >
        <CheckCircle2 size={40} style={{ color: 'var(--ryn-success)', marginBottom: 'var(--space-4)' }} />
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            color: 'var(--text-heading)',
            margin: '0 0 10px',
            fontWeight: 600,
          }}
        >
          Casi listo
        </h3>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
          Revisa tu email para confirmar tu consulta. Te hemos enviado un enlace que caduca en 24 horas.
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-md)',
        maxWidth: 640,
        margin: '0 auto',
      }}
    >
      {/* Toggle tipo */}
      <div
        style={{
          display: 'inline-flex',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-pill)',
          padding: 4,
          marginBottom: 'var(--space-6)',
        }}
      >
        {(
          [
            { value: 'generica', label: 'Consulta general' },
            { value: 'reserva', label: 'Solicitar reserva' },
          ] as { value: Tipo; label: string }[]
        ).map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTipo(opt.value)}
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 'var(--text-sm)',
              padding: '9px 18px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              cursor: 'pointer',
              background: tipo === opt.value ? 'var(--accent)' : 'transparent',
              color: tipo === opt.value ? 'var(--accent-on)' : 'var(--text-muted)',
              transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="ryn-consulta-grid">
          <Input label="Nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <Input label="Apellidos (opcional)" name="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
          <Input label="Teléfono" name="telefono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
          <Input label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        {tipo === 'reserva' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Apartamento</label>
              <select
                className="ryn-input"
                style={fieldStyle}
                value={apartamento}
                onChange={(e) => setApartamento(e.target.value)}
              >
                {apartamentos.map((apt) => (
                  <option key={apt.slug} value={apt.slug}>
                    {apt.nombre}
                  </option>
                ))}
              </select>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: toneColor[apartamentos.find((a) => a.slug === apartamento)?.tone ?? 'rojo'],
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  {apartamentos.find((a) => a.slug === apartamento)?.nombre}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Fechas</label>
              <div className="ryn-daypicker">
                {cargandoDisponibilidad ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: 'var(--text-sm)',
                      padding: 'var(--space-5) 0',
                    }}
                  >
                    <Loader2 size={16} className="ryn-spin" /> Comprobando disponibilidad…
                  </div>
                ) : (
                  <DayPicker
                    mode="range"
                    locale={es}
                    selected={range}
                    onSelect={setRange}
                    disabled={disabledMatcher}
                    numberOfMonths={1}
                    showOutsideDays
                  />
                )}
              </div>
            </div>
          </>
        )}

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Mensaje (opcional)</label>
          <textarea
            className="ryn-input"
            style={{ ...fieldStyle, minHeight: 90, resize: 'vertical' }}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Cuéntanos lo que necesites…"
          />
        </div>

        {error && (
          <p style={{ color: 'var(--ryn-danger)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', marginBottom: 16 }}>
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={enviando}>
          {enviando ? 'Enviando…' : tipo === 'reserva' ? 'Solicitar reserva' : 'Enviar consulta'}
        </Button>
      </form>
    </div>
  )
}

export function ConsultaSection() {
  return (
    <section id="reserva" style={{ background: 'var(--bg-page)', padding: 'var(--section-y) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)' }}>
        <SectionHead
          eyebrow="Contacto y reservas"
          titulo="Cuéntanos qué necesitas"
          texto="Escríbenos con una consulta general o solicita la reserva de un apartamento en tus fechas. Te confirmamos por email y te contactamos enseguida."
        />
        <div style={{ marginTop: 'var(--space-7)' }}>
          <Suspense fallback={null}>
            <ConsultaForm />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
