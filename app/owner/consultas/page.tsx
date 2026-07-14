import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { estadoConsulta, tipoConsulta } from '@/lib/utils/consultas'
import { ConsultaAccionesButtons } from '@/components/owner/ConsultaAccionesButtons'
import { EmptyState } from '@/components/ui/EmptyState'
import { Card } from '@/components/ui/Card'

const ESTADOS = ['pendiente_confirmacion', 'aceptada', 'cancelada', 'expirada'] as const
const TIPOS = ['generica', 'reserva'] as const
const POR_PAGINA = 20

interface Props {
  searchParams: { estado?: string; tipo?: string; page?: string }
}

export default async function OwnerConsultasPage({ searchParams }: Props) {
  const supabase = await createClient()
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)
  const desdeIdx = (page - 1) * POR_PAGINA
  const hastaIdx = desdeIdx + POR_PAGINA - 1

  let query = supabase
    .from('consultas')
    .select(
      'id, tipo, nombre, apellidos, telefono, email, fecha_checkin, fecha_checkout, estado, apartamentos(nombre)',
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(desdeIdx, hastaIdx)

  if (searchParams.estado && ESTADOS.includes(searchParams.estado as (typeof ESTADOS)[number])) {
    query = query.eq('estado', searchParams.estado)
  }
  if (searchParams.tipo && TIPOS.includes(searchParams.tipo as (typeof TIPOS)[number])) {
    query = query.eq('tipo', searchParams.tipo)
  }

  const { data: consultas, count } = await query
  const totalPaginas = Math.max(1, Math.ceil((count ?? 0) / POR_PAGINA))

  function hrefConFiltro(params: Record<string, string | undefined>) {
    const sp = new URLSearchParams()
    const combinado = { ...searchParams, ...params }
    Object.entries(combinado).forEach(([k, v]) => { if (v) sp.set(k, v) })
    const qs = sp.toString()
    return qs ? `/owner/consultas?${qs}` : '/owner/consultas'
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Gestión de consultas</h1>

        <div className="flex flex-wrap gap-2 mb-2">
          <Link href={hrefConFiltro({ estado: undefined, page: undefined })} className={`text-xs px-3 py-1.5 rounded-full border ${!searchParams.estado ? 'bg-[var(--ryn-ink)] text-white border-[var(--ryn-ink)]' : 'border-[var(--border-strong)] text-[var(--text-muted)]'}`}>
            Todos los estados
          </Link>
          {ESTADOS.map((e) => (
            <Link
              key={e}
              href={hrefConFiltro({ estado: e, page: undefined })}
              className={`text-xs px-3 py-1.5 rounded-full border ${searchParams.estado === e ? 'bg-[var(--ryn-ink)] text-white border-[var(--ryn-ink)]' : 'border-[var(--border-strong)] text-[var(--text-muted)]'}`}
            >
              {estadoConsulta(e).label}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Link href={hrefConFiltro({ tipo: undefined, page: undefined })} className={`text-xs px-3 py-1.5 rounded-full border ${!searchParams.tipo ? 'bg-[var(--ryn-ink)] text-white border-[var(--ryn-ink)]' : 'border-[var(--border-strong)] text-[var(--text-muted)]'}`}>
            Todos los tipos
          </Link>
          {TIPOS.map((t) => (
            <Link
              key={t}
              href={hrefConFiltro({ tipo: t, page: undefined })}
              className={`text-xs px-3 py-1.5 rounded-full border ${searchParams.tipo === t ? 'bg-[var(--ryn-ink)] text-white border-[var(--ryn-ink)]' : 'border-[var(--border-strong)] text-[var(--text-muted)]'}`}
            >
              {tipoConsulta(t)}
            </Link>
          ))}
        </div>

        {!consultas || consultas.length === 0 ? (
          <EmptyState title="No hay consultas con estos filtros" description="Prueba a cambiar el estado o el tipo." />
        ) : (
          <>
            {/* Vista tabla — sm y superior */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-[var(--text-muted)] uppercase text-xs border-b border-[var(--border)]">
                    <th className="py-2 pr-4">Nombre</th>
                    <th className="py-2 pr-4">Tipo</th>
                    <th className="py-2 pr-4">Apartamento</th>
                    <th className="py-2 pr-4">Fechas</th>
                    <th className="py-2 pr-4">Teléfono</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Estado</th>
                    <th className="py-2 pr-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {consultas.map((c) => {
                    const estado = estadoConsulta(c.estado)
                    return (
                      <tr key={c.id} className="border-b border-[var(--border)]">
                        <td className="py-2 pr-4">{c.nombre} {c.apellidos ?? ''}</td>
                        <td className="py-2 pr-4">{tipoConsulta(c.tipo)}</td>
                        <td className="py-2 pr-4">{c.apartamentos?.nombre ?? '—'}</td>
                        <td className="py-2 pr-4">
                          {c.fecha_checkin && c.fecha_checkout ? `${c.fecha_checkin} → ${c.fecha_checkout}` : '—'}
                        </td>
                        <td className="py-2 pr-4">{c.telefono}</td>
                        <td className="py-2 pr-4">{c.email}</td>
                        <td className="py-2 pr-4"><Badge tone={estado.tone} variant="soft">{estado.label}</Badge></td>
                        <td className="py-2 pr-4"><ConsultaAccionesButtons id={c.id} estado={c.estado} /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Vista tarjetas — móvil */}
            <div className="flex flex-col gap-3 sm:hidden">
              {consultas.map((c) => {
                const estado = estadoConsulta(c.estado)
                return (
                  <Card key={c.id} padding="sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{c.nombre} {c.apellidos ?? ''}</span>
                      <Badge tone={estado.tone} variant="soft">{estado.label}</Badge>
                    </div>
                    <div className="text-sm mb-1">{tipoConsulta(c.tipo)}{c.apartamentos?.nombre ? ` · ${c.apartamentos.nombre}` : ''}</div>
                    {c.fecha_checkin && c.fecha_checkout && (
                      <div className="text-sm text-[var(--text-muted)] mb-1">{c.fecha_checkin} → {c.fecha_checkout}</div>
                    )}
                    <div className="text-sm text-[var(--text-muted)] mb-2">{c.telefono} · {c.email}</div>
                    <div className="flex items-center justify-end">
                      <ConsultaAccionesButtons id={c.id} estado={c.estado} />
                    </div>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {totalPaginas > 1 && (
          <div className="flex items-center gap-2 mt-4 text-sm">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={hrefConFiltro({ page: String(p) })}
                className={`px-2 py-1 rounded ${p === page ? 'bg-[var(--ryn-ink)] text-white' : 'text-[var(--text-muted)] border border-[var(--border-strong)]'}`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
