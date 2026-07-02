'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

export function ReservaAccionesButtons({ id, estado }: { id: string; estado: string }) {
  const router = useRouter()
  const [cargando, setCargando] = useState<'confirmar' | 'anular' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [confirmarAnular, setConfirmarAnular] = useState(false)

  async function ejecutar(accion: 'confirmar' | 'anular') {
    setCargando(accion)
    setError(null)
    try {
      const res = await fetch(`/api/owner/reservas/${id}/${accion}`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo completar la acción')
      setConfirmarAnular(false)
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
          className="text-xs px-2 py-1 rounded text-white disabled:opacity-50"
          style={{ background: 'var(--ryn-success)' }}
        >
          {cargando === 'confirmar' ? '…' : 'Confirmar'}
        </button>
      )}
      {estado !== 'anulada' && estado !== 'completada' && (
        <button
          onClick={() => setConfirmarAnular(true)}
          disabled={cargando !== null}
          className="text-xs px-2 py-1 rounded text-white disabled:opacity-50"
          style={{ background: 'var(--ryn-danger)' }}
        >
          {cargando === 'anular' ? '…' : 'Anular'}
        </button>
      )}
      {error && <span role="alert" className="text-xs text-[var(--ryn-danger)]">{error}</span>}

      <ConfirmDialog
        open={confirmarAnular}
        title="Anular reserva"
        description="¿Seguro que quieres anular esta reserva? Si tiene un pago completado, se reembolsará automáticamente."
        confirmLabel="Anular"
        danger
        loading={cargando === 'anular'}
        onConfirm={() => ejecutar('anular')}
        onCancel={() => setConfirmarAnular(false)}
      />
    </div>
  )
}
