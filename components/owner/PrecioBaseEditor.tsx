'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function PrecioBaseEditor({ apartamentoId, nombre, precioActual }: { apartamentoId: string; nombre: string; precioActual: number }) {
  const router = useRouter()
  const [valor, setValor] = useState(precioActual)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  async function guardar() {
    setGuardando(true)
    setMensaje(null)
    try {
      const res = await fetch(`/api/owner/apartamentos/${apartamentoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ precio_noche_base: valor }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo guardar')
      setMensaje('Guardado')
      router.refresh()
    } catch (e) {
      setMensaje(e instanceof Error ? e.message : 'Error')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
      <span className="font-medium text-sm">{nombre}</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          step="0.01"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 w-24 text-sm"
        />
        <span className="text-sm text-gray-400">€/noche</span>
        <button onClick={guardar} disabled={guardando || valor === precioActual} className="text-xs px-2 py-1 rounded bg-gray-900 text-white disabled:opacity-40">
          {guardando ? '…' : 'Guardar'}
        </button>
        {mensaje && <span className="text-xs text-gray-400">{mensaje}</span>}
      </div>
    </div>
  )
}
