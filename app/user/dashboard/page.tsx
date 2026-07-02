import Link from 'next/link'
import { CalendarDays, ListChecks, PlusCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { estadoReserva } from '@/lib/utils/reservas'
import { formatearPrecio } from '@/lib/utils/precios'
import { EmptyState } from '@/components/ui/EmptyState'

export default async function UserDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase.from('profiles').select('nombre').eq('id', user.id).single()
    : { data: null }

  const hoy = new Date().toISOString().slice(0, 10)
  const { data: proximaReserva } = await supabase
    .from('reservas')
    .select('id, codigo, fecha_checkin, fecha_checkout, estado, precio_total, apartamentos(nombre)')
    .neq('estado', 'anulada')
    .gte('fecha_checkin', hoy)
    .order('fecha_checkin', { ascending: true })
    .limit(1)
    .maybeSingle()

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Hola, {profile?.nombre ?? 'de nuevo'}</h1>
        <p className="text-[var(--text-muted)] mb-6">Este es tu panel de reservas.</p>

        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2">Próxima reserva</h2>
          {proximaReserva ? (
            <Link
              href={`/user/reservas/${proximaReserva.id}`}
              className="block rounded-lg border border-[var(--border)] p-5 hover:border-[var(--border-strong)] transition-colors"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="font-semibold">{proximaReserva.apartamentos?.nombre ?? 'Apartamento'}</div>
                  <div className="text-sm text-[var(--text-muted)] flex items-center gap-1 mt-1">
                    <CalendarDays size={14} /> {proximaReserva.fecha_checkin} → {proximaReserva.fecha_checkout}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{proximaReserva.codigo}</div>
                </div>
                <div className="text-right">
                  <Badge tone={estadoReserva(proximaReserva.estado).tone} variant="soft">
                    {estadoReserva(proximaReserva.estado).label}
                  </Badge>
                  <div className="font-semibold mt-2">{formatearPrecio(proximaReserva.precio_total)}</div>
                </div>
              </div>
            </Link>
          ) : (
            <EmptyState title="No tienes ninguna reserva próxima" description="Cuando reserves un apartamento, aparecerá aquí." />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/user/reservas" className="flex items-center gap-2 rounded-lg border border-[var(--border)] p-4 hover:border-[var(--border-strong)] transition-colors">
            <ListChecks size={18} className="text-[var(--accent)]" /> Mis reservas
          </Link>
          <Link href="/#rojo" className="flex items-center gap-2 rounded-lg border border-[var(--border)] p-4 hover:border-[var(--border-strong)] transition-colors">
            <PlusCircle size={18} className="text-[var(--accent)]" /> Nueva reserva
          </Link>
          <Link href="/user/chat" className="flex items-center gap-2 rounded-lg border border-[var(--border)] p-4 hover:border-[var(--border-strong)] transition-colors">
            <ListChecks size={18} className="text-[var(--accent)]" /> Chat
          </Link>
        </div>
      </div>
    </main>
  )
}
