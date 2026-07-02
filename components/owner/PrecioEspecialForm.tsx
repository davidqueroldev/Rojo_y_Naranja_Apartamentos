'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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

  async function eliminar(id: string) {
    if (!window.confirm('¿Eliminar esta tarifa especial?')) return
    await fetch(`/api/owner/precios/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">Nueva tarifa especial</h2>
        <div className="rounded-lg border border-gray-200 p-4 flex flex-col gap-3">
          <select value={apartamentoId} onChange={(e) => setApartamentoId(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm">
            {apartamentosDisponibles.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
          <input type="text" placeholder="Nombre (Semana Santa, Fin de Año…)" value={nombre} onChange={(e) => setNombre(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm" />
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm" />
          </div>
          <input type="number" min={1} step="0.01" placeholder="Precio/noche" value={precioNoche || ''} onChange={(e) => setPrecioNoche(Number(e.target.value))} className="border border-gray-300 rounded px-2 py-1 text-sm" />
          {error && <p className="text-sm text-red-600">{error}</p>}
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
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">Tarifas especiales activas</h2>
        {especiales.length === 0 ? (
          <p className="text-sm text-gray-500">Sin tarifas especiales.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {especiales.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm">
                <div>
                  <div className="font-medium">{p.nombre} — {p.apartamentos?.nombre}</div>
                  <div className="text-xs text-gray-400">{p.fecha_inicio} → {p.fecha_fin} · {p.precio_noche}€/noche</div>
                </div>
                <button onClick={() => eliminar(p.id)} className="text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
