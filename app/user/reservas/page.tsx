import Link from 'next/link'
import { CalendarDays, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { estadoReserva } from '@/lib/utils/reservas'
import { formatearPrecio } from '@/lib/utils/precios'

export default async function MisReservasPage() {
  const supabase = await createClient()
  const { data: reservas } = await supabase
    .from('reservas')
    .select('id, codigo, fecha_checkin, fecha_checkout, num_huespedes, precio_total, estado, apartamentos(nombre)')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Mis reservas</h1>

      {!reservas || reservas.length === 0 ? (
        <p className="text-sm text-gray-500">Todavía no tienes ninguna reserva.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {reservas.map((r) => {
            const estado = estadoReserva(r.estado)
            return (
              <Link
                key={r.id}
                href={`/user/reservas/${r.id}`}
                className="block rounded-lg border border-gray-200 p-4 hover:border-gray-400 transition-colors"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-semibold">{r.apartamentos?.nombre ?? 'Apartamento'}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <CalendarDays size={14} /> {r.fecha_checkin} → {r.fecha_checkout}
                      <span className="mx-1">·</span>
                      <Users size={14} /> {r.num_huespedes}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{r.codigo}</div>
                  </div>
                  <div className="text-right">
                    <Badge tone={estado.tone} variant="soft">{estado.label}</Badge>
                    <div className="font-semibold mt-2">{formatearPrecio(r.precio_total)}</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
