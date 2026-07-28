import Link from 'next/link'
import { AlertCircle, Inbox } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { estadoSolicitud, tipoSolicitud } from '@/lib/utils/solicitudes'
import { apartamentos as apartamentosEstaticos } from '@/lib/data/apartments'
import { Badge } from '@/components/ui/Badge'

const nombreApartamento = (slug: string | null) =>
  slug ? (apartamentosEstaticos.find((a) => a.slug === slug)?.nombre ?? slug) : null

export default async function OwnerDashboardPage() {
  const supabase = await createClient()

  const [{ count: pendientesCount }, { data: pendientes }] = await Promise.all([
    supabase.from('solicitudes').select('id', { count: 'exact', head: true }).eq('estado', 'pendiente_gestion'),
    supabase
      .from('solicitudes')
      .select('id, tipo, nombre, apellidos, apartamento_slug, fecha_checkin, fecha_checkout, estado, created_at')
      .eq('estado', 'pendiente_gestion')
      .order('created_at', { ascending: true })
      .limit(10),
  ])

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Panel propietario</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <Card padding="sm">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">
              <Inbox size={14} /> Solicitudes pendientes
            </div>
            <div className="text-3xl font-bold">{pendientesCount ?? 0}</div>
            <Link href="/owner/solicitudes" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
              Ver todas las solicitudes →
            </Link>
          </Card>
        </div>

        {pendientes && pendientes.length > 0 ? (
          <>
            <div className="mb-3 flex items-center gap-2 font-semibold text-sm" style={{ color: '#8A5E14' }}>
              <AlertCircle size={16} /> Pendientes de gestión
            </div>
            <div className="flex flex-col gap-2">
              {pendientes.map((s) => {
                const est = estadoSolicitud(s.estado)
                const apt = nombreApartamento(s.apartamento_slug)
                return (
                  <Link key={s.id} href="/owner/solicitudes?estado=pendiente_gestion">
                    <Card padding="sm" className="hover:bg-[var(--surface-sunken)] transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold">{s.nombre} {s.apellidos ?? ''}</span>
                          <span className="text-sm text-[var(--text-muted)]"> · {tipoSolicitud(s.tipo)}{apt ? ` · ${apt}` : ''}</span>
                          {s.fecha_checkin && s.fecha_checkout && (
                            <div className="text-sm text-[var(--text-muted)]">{s.fecha_checkin} → {s.fecha_checkout}</div>
                          )}
                        </div>
                        <Badge tone={est.tone} variant="soft">{est.label}</Badge>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </>
        ) : (
          <Card padding="lg" className="text-center text-[var(--text-muted)]">
            No hay solicitudes pendientes de gestión.
          </Card>
        )}
      </div>
    </main>
  )
}
