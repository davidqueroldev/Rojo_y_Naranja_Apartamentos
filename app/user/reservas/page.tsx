import Link from 'next/link'
import { CalendarDays, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { estadoReserva } from '@/lib/utils/reservas'
import { formatearPrecio } from '@/lib/utils/precios'

const FILTROS = ['pendiente_pago', 'pendiente_confirmacion', 'confirmada', 'completada', 'anulada'] as const

interface Props {
  searchParams: { estado?: string }
}

export default async function MisReservasPage({ searchParams }: Props) {
  const supabase = await createClient()
  const filtro = searchParams.estado

  let query = supabase
    .from('reservas')
    .select('id, codigo, fecha_checkin, fecha_checkout, num_huespedes, precio_total, estado, apartamentos(nombre)')
    .order('created_at', { ascending: false })

  if (filtro && FILTROS.includes(filtro as (typeof FILTROS)[number])) {
    query = query.eq('estado', filtro)
  }

  const { data: reservas } = await query

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Mis reservas</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/user/reservas"
          className={`text-xs px-3 py-1.5 rounded-full border ${!filtro ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600'}`}
        >
          Todas
        </Link>
        {FILTROS.map((f) => (
          <Link
            key={f}
            href={`/user/reservas?estado=${f}`}
            className={`text-xs px-3 py-1.5 rounded-full border ${filtro === f ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600'}`}
          >
            {estadoReserva(f).label}
          </Link>
        ))}
      </div>

      {!reservas || reservas.length === 0 ? (
        <p className="text-sm text-gray-500">No hay reservas para este filtro.</p>
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
