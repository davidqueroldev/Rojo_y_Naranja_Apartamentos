import { notFound } from 'next/navigation'
import { CalendarDays, Users, MapPin, User as UserIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { estadoReserva } from '@/lib/utils/reservas'
import { formatearPrecio } from '@/lib/utils/precios'
import { ReservaAccionesButtons } from '@/components/owner/ReservaAccionesButtons'
import { ReservaEditForm } from '@/components/owner/ReservaEditForm'

interface Props {
  params: { id: string }
}

export default async function OwnerReservaDetallePage({ params }: Props) {
  const supabase = await createClient()
  const { data: reserva } = await supabase
    .from('reservas')
    .select('*, apartamentos(nombre, slug), profiles(nombre, apellidos, telefono)')
    .eq('id', params.id)
    .single()

  if (!reserva) notFound()

  const estado = estadoReserva(reserva.estado)

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Reserva {reserva.codigo}</h1>
          <Badge tone={estado.tone} variant="soft">{estado.label}</Badge>
        </div>

        <div className="rounded-lg border border-gray-200 p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 font-semibold">
            <MapPin size={16} /> {reserva.apartamentos?.nombre ?? 'Apartamento'}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays size={16} /> {reserva.fecha_checkin} → {reserva.fecha_checkout}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} /> {reserva.num_huespedes} huésped{reserva.num_huespedes > 1 ? 'es' : ''}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UserIcon size={16} /> {reserva.profiles?.nombre} {reserva.profiles?.apellidos ?? ''}
            {reserva.profiles?.telefono && <span>· {reserva.profiles.telefono}</span>}
          </div>
          {reserva.notas_usuario && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Notas del huésped:</span> {reserva.notas_usuario}
            </div>
          )}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatearPrecio(reserva.precio_total)}</span>
          </div>
        </div>

        <div className="mt-4">
          <ReservaAccionesButtons id={reserva.id} estado={reserva.estado} />
        </div>

        <ReservaEditForm
          reservaId={reserva.id}
          fechaCheckin={reserva.fecha_checkin}
          fechaCheckout={reserva.fecha_checkout}
          numHuespedes={reserva.num_huespedes}
          notasPropietario={reserva.notas_propietario}
        />
      </div>
    </main>
  )
}
