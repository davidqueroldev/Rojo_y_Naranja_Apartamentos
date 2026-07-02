'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  reservaId: string
  fechaCheckin: string
  fechaCheckout: string
  numHuespedes: number
  notasPropietario: string | null
}

export function ReservaEditForm({ reservaId, fechaCheckin, fechaCheckout, numHuespedes, notasPropietario }: Props) {
  const router = useRouter()
  const [checkin, setCheckin] = useState(fechaCheckin)
  const [checkout, setCheckout] = useState(fechaCheckout)
  const [huespedes, setHuespedes] = useState(numHuespedes)
  const [notas, setNotas] = useState(notasPropietario ?? '')
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  async function guardar(e: React.FormEvent) {
    e.preventDefault()
    setGuardando(true)
    setMensaje(null)
    try {
      const res = await fetch(`/api/owner/reservas/${reservaId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha_checkin: checkin,
          fecha_checkout: checkout,
          num_huespedes: huespedes,
          notas_propietario: notas,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo guardar')
      setMensaje('Guardado.')
      router.refresh()
    } catch (e) {
      setMensaje(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <form onSubmit={guardar} className="rounded-lg border border-gray-200 p-5 flex flex-col gap-3 mt-4">
      <h2 className="font-semibold text-sm">Modificar reserva</h2>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs text-gray-400 uppercase">Check-in</span>
          <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className="border border-gray-300 rounded px-2 py-1" />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs text-gray-400 uppercase">Check-out</span>
          <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className="border border-gray-300 rounded px-2 py-1" />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-xs text-gray-400 uppercase">Huéspedes</span>
        <input type="number" min={1} value={huespedes} onChange={(e) => setHuespedes(Number(e.target.value))} className="border border-gray-300 rounded px-2 py-1 w-24" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-xs text-gray-400 uppercase">Nota interna</span>
        <textarea value={notas} onChange={(e) => setNotas(e.target.value)} className="border border-gray-300 rounded px-2 py-1" rows={2} />
      </label>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={guardando} className="px-3 py-1.5 rounded bg-gray-900 text-white text-sm disabled:opacity-50">
          {guardando ? 'Guardando…' : 'Guardar cambios'}
        </button>
        {mensaje && <span className="text-sm text-gray-500">{mensaje}</span>}
      </div>
    </form>
  )
}
