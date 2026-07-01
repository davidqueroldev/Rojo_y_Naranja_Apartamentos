import { notFound } from 'next/navigation'
import { CalendarDays, Users, MapPin, CheckCircle2, XCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { estadoReserva } from '@/lib/utils/reservas'
import { formatearPrecio } from '@/lib/utils/precios'
import { RetryPaymentButton } from '@/components/booking/RetryPaymentButton'

interface Props {
  params: { id: string }
  searchParams: { pago?: string }
}

export default async function DetalleReservaPage({ params, searchParams }: Props) {
  const supabase = await createClient()
  const { data: reserva } = await supabase
    .from('reservas')
    .select('*, apartamentos(nombre, slug)')
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
          {reserva.notas_usuario && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Notas:</span> {reserva.notas_usuario}
            </div>
          )}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatearPrecio(reserva.precio_total)}</span>
          </div>
        </div>

        {searchParams.pago === 'ok' && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg p-3 mt-4">
            <CheckCircle2 size={16} /> Pago recibido. El propietario confirmará tu reserva en breve.
          </div>
        )}

        {searchParams.pago === 'cancelado' && reserva.estado === 'pendiente_pago' && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
              <XCircle size={16} /> El pago se canceló. Puedes reintentarlo cuando quieras.
            </div>
            <RetryPaymentButton reservaId={reserva.id} />
          </div>
        )}

        {!searchParams.pago && reserva.estado === 'pendiente_pago' && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">
              Tu reserva está registrada pero el pago aún no se ha procesado.
            </p>
            <RetryPaymentButton reservaId={reserva.id} />
          </div>
        )}
      </div>
    </main>
  )
}
