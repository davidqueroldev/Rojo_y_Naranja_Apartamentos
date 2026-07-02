'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

export interface PrecioEspecialRow {
  id: string
  nombre: string
  fecha_inicio: string
  fecha_fin: string
  precio_noche: number
  apartamentos: { nombre: string } | null
}

interface ApartamentoOption {
  id: string
  nombre: string
}

export function PrecioEspecialForm({ apartamentosDisponibles, especiales }: { apartamentosDisponibles: ApartamentoOption[]; especiales: PrecioEspecialRow[] }) {
  const router = useRouter()
  const [apartamentoId, setApartamentoId] = useState(apartamentosDisponibles[0]?.id ?? '')
  const [nombre, setNombre] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [precioNoche, setPrecioNoche] = useState(0)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [eliminandoId, setEliminandoId] = useState<string | null>(null)
  const [aEliminar, setAEliminar] = useState<PrecioEspecialRow | null>(null)

  async function crear() {
    setEnviando(true)
    setError(null)
    try {
      const res = await fetch('/api/owner/precios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartamento_id: apartamentoId,
          nombre,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          precio_noche: precioNoche,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo crear')
      setNombre('')
      setFechaInicio('')
      setFechaFin('')
      setPrecioNoche(0)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setEnviando(false)
    }
  }

  async function confirmarEliminar() {
    if (!aEliminar) return
    setEliminandoId(aEliminar.id)
    try {
      const res = await fetch(`/api/owner/precios/${aEliminar.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('No se pudo eliminar la tarifa')
      setAEliminar(null)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setEliminandoId(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2">Nueva tarifa especial</h2>
        <div className="rounded-lg border border-[var(--border)] p-4 flex flex-col gap-3">
          <select value={apartamentoId} onChange={(e) => setApartamentoId(e.target.value)} className="ryn-input border border-[var(--border-strong)] rounded px-2 py-1 text-sm">
            {apartamentosDisponibles.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
          <input type="text" placeholder="Nombre (Semana Santa, Fin de Año…)" value={nombre} onChange={(e) => setNombre(e.target.value)} className="ryn-input border border-[var(--border-strong)] rounded px-2 py-1 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="ryn-input border border-[var(--border-strong)] rounded px-2 py-1 text-sm" />
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} className="ryn-input border border-[var(--border-strong)] rounded px-2 py-1 text-sm" />
          </div>
          <input type="number" min={1} step="0.01" placeholder="Precio/noche" value={precioNoche || ''} onChange={(e) => setPrecioNoche(Number(e.target.value))} className="ryn-input border border-[var(--border-strong)] rounded px-2 py-1 text-sm" />
          {error && <p role="alert" className="text-sm text-[var(--ryn-danger)]">{error}</p>}
          <Button
            variant="primary" size="sm" fullWidth
            disabled={enviando || !nombre || !fechaInicio || !fechaFin || !precioNoche}
            onClick={crear}
          >
            {enviando ? 'Guardando…' : 'Añadir tarifa'}
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2">Tarifas especiales activas</h2>
        {especiales.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">Sin tarifas especiales.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {especiales.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3 text-sm">
                <div>
                  <div className="font-medium">{p.nombre} — {p.apartamentos?.nombre}</div>
                  <div className="text-xs text-[var(--text-muted)]">{p.fecha_inicio} → {p.fecha_fin} · {p.precio_noche}€/noche</div>
                </div>
                <button
                  onClick={() => setAEliminar(p)}
                  disabled={eliminandoId === p.id}
                  aria-label={`Eliminar tarifa ${p.nombre}`}
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
        title="Eliminar tarifa especial"
        description={aEliminar ? `¿Eliminar "${aEliminar.nombre}" (${aEliminar.fecha_inicio} → ${aEliminar.fecha_fin})?` : undefined}
        confirmLabel="Eliminar"
        danger
        loading={!!eliminandoId}
        onConfirm={confirmarEliminar}
        onCancel={() => setAEliminar(null)}
      />
    </div>
  )
}
