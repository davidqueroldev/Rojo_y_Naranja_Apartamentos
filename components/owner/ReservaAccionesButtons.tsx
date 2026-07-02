'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ReservaAccionesButtons({ id, estado }: { id: string; estado: string }) {
  const router = useRouter()
  const [cargando, setCargando] = useState<'confirmar' | 'anular' | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function ejecutar(accion: 'confirmar' | 'anular') {
    if (accion === 'anular' && !window.confirm('¿Seguro que quieres anular esta reserva? Si tiene un pago completado, se reembolsará automáticamente.')) {
      return
    }
    setCargando(accion)
    setError(null)
    try {
      const res = await fetch(`/api/owner/reservas/${id}/${accion}`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo completar la acción')
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setCargando(null)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {estado === 'pendiente_confirmacion' && (
        <button
          onClick={() => ejecutar('confirmar')}
          disabled={cargando !== null}
          className="text-xs px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {cargando === 'confirmar' ? '…' : 'Confirmar'}
        </button>
      )}
      {estado !== 'anulada' && estado !== 'completada' && (
        <button
          onClick={() => ejecutar('anular')}
          disabled={cargando !== null}
          className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {cargando === 'anular' ? '…' : 'Anular'}
        </button>
      )}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
