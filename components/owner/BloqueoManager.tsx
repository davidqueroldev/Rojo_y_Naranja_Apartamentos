'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DayPicker, type DateRange } from 'react-day-picker'
import 'react-day-picker/style.css'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

export interface Bloqueo {
  id: string
  fecha_inicio: string
  fecha_fin: string
  motivo: string | null
}

function fmt(d: Date) {
  return format(d, 'yyyy-MM-dd')
}

export function BloqueoManager({ apartamentoId, bloqueos }: { apartamentoId: string; bloqueos: Bloqueo[] }) {
  const router = useRouter()
  const [range, setRange] = useState<DateRange | undefined>()
  const [motivo, setMotivo] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [eliminando, setEliminando] = useState<string | null>(null)
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null)
  const [aEliminar, setAEliminar] = useState<Bloqueo | null>(null)

  const fechasBloqueadas = new Set(bloqueos.flatMap((b) => {
    const dias: string[] = []
    let actual = new Date(`${b.fecha_inicio}T00:00:00Z`)
    const limite = new Date(`${b.fecha_fin}T00:00:00Z`)
    while (actual < limite) {
      dias.push(actual.toISOString().slice(0, 10))
      actual = new Date(actual.getTime() + 86_400_000)
    }
    return dias
  }))

  async function crearBloqueo() {
    if (!range?.from || !range?.to) return
    setEnviando(true)
    setError(null)
    try {
      const res = await fetch('/api/owner/bloqueos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartamento_id: apartamentoId,
          fecha_inicio: fmt(range.from),
          fecha_fin: fmt(range.to),
          motivo: motivo || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo crear el bloqueo')
      setRange(undefined)
      setMotivo('')
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setEnviando(false)
    }
  }

  async function confirmarEliminar() {
    if (!aEliminar) return
    setEliminando(aEliminar.id)
    setErrorEliminar(null)
    try {
      const res = await fetch(`/api/owner/bloqueos/${aEliminar.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('No se pudo eliminar el bloqueo')
      setAEliminar(null)
      router.refresh()
    } catch (e) {
      setErrorEliminar(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setEliminando(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2">Nuevo bloqueo</h2>
        <div className="rounded-lg border border-[var(--border)] p-4">
          <div className="ryn-daypicker">
            <DayPicker
              mode="range"
              locale={es}
              selected={range}
              onSelect={setRange}
              disabled={[{ before: new Date() }, (date) => fechasBloqueadas.has(fmt(date))]}
            />
          </div>
          <input
            type="text"
            placeholder="Motivo (mantenimiento, uso propietario…)"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            className="ryn-input border border-[var(--border-strong)] rounded px-2 py-1 w-full mt-3 text-sm"
          />
          {error && <p role="alert" className="text-sm text-[var(--ryn-danger)] mt-2">{error}</p>}
          <Button variant="primary" size="sm" fullWidth disabled={!range?.from || !range?.to || enviando} onClick={crearBloqueo} className="mt-3">
            {enviando ? 'Guardando…' : 'Bloquear fechas'}
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2">Bloqueos existentes</h2>
        {errorEliminar && <p role="alert" className="text-sm text-[var(--ryn-danger)] mb-2">{errorEliminar}</p>}
        {bloqueos.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">Sin bloqueos activos.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {bloqueos.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3 text-sm">
                <div>
                  <div>{b.fecha_inicio} → {b.fecha_fin}</div>
                  {b.motivo && <div className="text-xs text-[var(--text-muted)]">{b.motivo}</div>}
                </div>
                <button
                  onClick={() => setAEliminar(b)}
                  disabled={eliminando === b.id}
                  aria-label={`Eliminar bloqueo del ${b.fecha_inicio} al ${b.fecha_fin}`}
                  className="text-[var(--ryn-stone-2)] hover:text-[var(--ryn-danger)] disabled:opacity-40"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!aEliminar}
        title="Eliminar bloqueo"
        description={aEliminar ? `¿Eliminar el bloqueo del ${aEliminar.fecha_inicio} al ${aEliminar.fecha_fin}?` : undefined}
        confirmLabel="Eliminar"
        danger
        loading={!!eliminando}
        onConfirm={confirmarEliminar}
        onCancel={() => setAEliminar(null)}
      />
    </div>
  )
}
