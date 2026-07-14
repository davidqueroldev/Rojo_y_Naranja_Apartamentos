'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

export function ConsultaAccionesButtons({ id, estado }: { id: string; estado: string }) {
  const router = useRouter()
  const [cargando, setCargando] = useState<'aceptar' | 'cancelar' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [confirmarCancelar, setConfirmarCancelar] = useState(false)

  async function ejecutar(accion: 'aceptar' | 'cancelar') {
    setCargando(accion)
    setError(null)
    try {
      const res = await fetch(`/api/owner/consultas/${id}/${accion}`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo completar la acción')
      setConfirmarCancelar(false)
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
          onClick={() => ejecutar('aceptar')}
          disabled={cargando !== null}
          className="text-xs px-2 py-1 rounded text-white disabled:opacity-50"
          style={{ background: 'var(--ryn-success)' }}
        >
          {cargando === 'aceptar' ? '…' : 'Aceptar'}
        </button>
      )}
      {estado !== 'cancelada' && estado !== 'aceptada' && (
        <button
          onClick={() => setConfirmarCancelar(true)}
          disabled={cargando !== null}
          className="text-xs px-2 py-1 rounded text-white disabled:opacity-50"
          style={{ background: 'var(--ryn-danger)' }}
        >
          {cargando === 'cancelar' ? '…' : 'Cancelar'}
        </button>
      )}
      {error && <span role="alert" className="text-xs text-[var(--ryn-danger)]">{error}</span>}

      <ConfirmDialog
        open={confirmarCancelar}
        title="Cancelar consulta"
        description="¿Seguro que quieres cancelar esta consulta?"
        confirmLabel="Cancelar"
        danger
        loading={cargando === 'cancelar'}
        onConfirm={() => ejecutar('cancelar')}
        onCancel={() => setConfirmarCancelar(false)}
      />
    </div>
  )
}
