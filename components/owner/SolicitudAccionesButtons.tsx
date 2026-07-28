'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

export function SolicitudAccionesButtons({ id, estado }: { id: string; estado: string }) {
  const router = useRouter()
  const [cargando, setCargando] = useState<'aceptar' | 'rechazar' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [confirmarRechazar, setConfirmarRechazar] = useState(false)

  async function ejecutar(accion: 'aceptar' | 'rechazar') {
    setCargando(accion)
    setError(null)
    try {
      const res = await fetch(`/api/owner/solicitudes/${id}/${accion}`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo completar la acción')
      setConfirmarRechazar(false)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setCargando(null)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {estado === 'pendiente_gestion' && (
        <button
          onClick={() => ejecutar('aceptar')}
          disabled={cargando !== null}
          className="text-xs px-2 py-1 rounded text-white disabled:opacity-50"
          style={{ background: 'var(--ryn-success)' }}
        >
          {cargando === 'aceptar' ? '…' : 'Aceptar'}
        </button>
      )}
      {estado !== 'rechazada' && estado !== 'aceptada' && (
        <button
          onClick={() => setConfirmarRechazar(true)}
          disabled={cargando !== null}
          className="text-xs px-2 py-1 rounded text-white disabled:opacity-50"
          style={{ background: 'var(--ryn-danger)' }}
        >
          {cargando === 'rechazar' ? '…' : 'Rechazar'}
        </button>
      )}
      {error && <span role="alert" className="text-xs text-[var(--ryn-danger)]">{error}</span>}

      <ConfirmDialog
        open={confirmarRechazar}
        title="Rechazar solicitud"
        description="¿Seguro que quieres rechazar esta solicitud?"
        confirmLabel="Rechazar"
        danger
        loading={cargando === 'rechazar'}
        onConfirm={() => ejecutar('rechazar')}
        onCancel={() => setConfirmarRechazar(false)}
      />
    </div>
  )
}
