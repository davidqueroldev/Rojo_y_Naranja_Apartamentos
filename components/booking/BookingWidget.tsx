'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DayPicker, type DateRange } from 'react-day-picker'
import 'react-day-picker/style.css'
import { addMonths, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarDays, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Apartment } from '@/lib/data/apartments'
import { calcularDesglose, formatearPrecio } from '@/lib/utils/precios'

type Step = 1 | 2

const inputLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 'var(--text-xs)',
  letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)',
  display: 'block', marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: '100%', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-base)',
  color: 'var(--text-body)', background: 'var(--surface-card)',
  border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)',
  padding: '10px 12px', outline: 'none', boxSizing: 'border-box',
}

function fmt(d: Date) {
  return format(d, 'yyyy-MM-dd')
}

export function BookingWidget({ apartment: apt }: { apartment: Apartment }) {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [range, setRange] = useState<DateRange | undefined>()
  const [huespedes, setHuespedes] = useState(1)
  const [notas, setNotas] = useState('')
  const [fechasOcupadas, setFechasOcupadas] = useState<Set<string>>(new Set())
  const [cargandoDisponibilidad, setCargandoDisponibilidad] = useState(true)
  const [precioTotal, setPrecioTotal] = useState<number | null>(null)
  const [desglose, setDesglose] = useState<ReturnType<typeof calcularDesglose>>([])
  const [cargandoResumen, setCargandoResumen] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const inicio = fmt(new Date())
    const fin = fmt(addMonths(new Date(), 12))
    fetch(`/api/disponibilidad?apartamento=${apt.slug}&inicio=${inicio}&fin=${fin}`)
      .then((r) => r.json())
      .then((data) => setFechasOcupadas(new Set<string>(data.fechas_ocupadas ?? [])))
      .catch(() => setError('No se pudo comprobar la disponibilidad. Recarga la página.'))
      .finally(() => setCargandoDisponibilidad(false))
  }, [apt.slug])

  const disabledMatcher = useMemo(
    () => [
      { before: new Date() },
      (date: Date) => fechasOcupadas.has(fmt(date)),
    ],
    [fechasOcupadas]
  )

  const noches = range?.from && range?.to
    ? Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000)
    : 0

  async function irAResumen() {
    if (!range?.from || !range?.to) return
    setError(null)
    setCargandoResumen(true)
    try {
      const checkin = fmt(range.from)
      const checkout = fmt(range.to)
      const res = await fetch(`/api/reservas/precio?apartamento=${apt.slug}&inicio=${checkin}&fin=${checkout}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo calcular el precio')

      setPrecioTotal(data.precio_total as number)
      setDesglose(data.desglose as ReturnType<typeof calcularDesglose>)
      setStep(2)
    } catch {
      setError('No se pudo calcular el precio. Inténtalo de nuevo.')
    } finally {
      setCargandoResumen(false)
    }
  }

  async function confirmarReserva() {
    if (!range?.from || !range?.to) return
    setEnviando(true)
    setError(null)
    try {
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartamento: apt.slug,
          fecha_checkin: fmt(range.from),
          fecha_checkout: fmt(range.to),
          num_huespedes: huespedes,
          notas_usuario: notas || undefined,
        }),
      })
      if (res.status === 401) {
        router.push('/login')
        return
      }
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo crear la reserva')

      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reserva_id: data.reserva_id }),
      })
      const checkoutData = await checkoutRes.json()
      if (!checkoutRes.ok || !checkoutData.url) {
        // La reserva ya se creó; el usuario puede reintentar el pago desde su detalle.
        router.push(`/user/reservas/${data.reserva_id}`)
        return
      }
      window.location.href = checkoutData.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo crear la reserva')
      setEnviando(false)
    }
  }

  return (
    <div
      style={{
        background: 'var(--surface-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 'var(--space-5)' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'var(--text-heading)' }}>
          {apt.precio}€
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>/noche</span>
      </div>

      {step === 1 && (
        <>
          <div className="ryn-daypicker" style={{ marginBottom: 'var(--space-5)' }}>
            {cargandoDisponibilidad ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', padding: 'var(--space-6) 0' }}>
                <Loader2 size={18} className="ryn-spin" /> Comprobando disponibilidad…
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

          <div style={{ marginBottom: 'var(--space-5)' }}>
            <label style={inputLabelStyle}>Personas</label>
            <select
              className="ryn-input"
              style={inputStyle}
              value={huespedes}
              onChange={(e) => setHuespedes(Number(e.target.value))}
            >
              {Array.from({ length: apt.capacidadMax }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} persona{i > 0 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {error && <p style={{ color: 'var(--ryn-rojo-dark)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{error}</p>}

          <Button variant="primary" size="lg" fullWidth disabled={!range?.from || !range?.to || cargandoResumen} onClick={irAResumen}>
            {cargandoResumen ? 'Calculando…' : 'Continuar'}
          </Button>
        </>
      )}

      {step === 2 && range?.from && range?.to && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-5)', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)' }}>
            <CalendarDays size={18} style={{ color: 'var(--accent)' }} />
            {format(range.from, 'd MMM yyyy', { locale: es })} → {format(range.to, 'd MMM yyyy', { locale: es })} · {noches} noche{noches > 1 ? 's' : ''} · {huespedes} persona{huespedes > 1 ? 's' : ''}
          </div>

          <div style={{ marginBottom: 'var(--space-5)' }}>
            {desglose.map((seg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span>{seg.noches} noche{seg.noches > 1 ? 's' : ''} × {formatearPrecio(seg.precioNoche)}{seg.nombre ? ` (${seg.nombre})` : ''}</span>
                <span>{formatearPrecio(seg.noches * seg.precioNoche)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--text-heading)', padding: '10px 0 0' }}>
              <span>Total</span>
              <span>{precioTotal !== null ? formatearPrecio(precioTotal) : '—'}</span>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-5)' }}>
            <label style={inputLabelStyle}>Notas (opcional)</label>
            <textarea
              className="ryn-input"
              style={{ ...inputStyle, minHeight: 72, resize: 'vertical' }}
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Hora de llegada aproximada, peticiones especiales…"
            />
          </div>

          {error && <p style={{ color: 'var(--ryn-rojo-dark)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{error}</p>}

          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="outline" size="lg" onClick={() => setStep(1)}>Atrás</Button>
            <Button variant="primary" size="lg" fullWidth disabled={enviando} onClick={confirmarReserva}>
              {enviando ? 'Confirmando…' : 'Confirmar reserva'}
            </Button>
          </div>
        </>
      )}

      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textAlign: 'center', margin: 'var(--space-3) 0 0', lineHeight: 1.5 }}>
        Reserva directa · Sin comisiones · Mejor precio garantizado
      </p>
    </div>
  )
}
