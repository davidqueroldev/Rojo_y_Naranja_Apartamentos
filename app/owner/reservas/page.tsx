import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { estadoReserva } from '@/lib/utils/reservas'
import { formatearPrecio } from '@/lib/utils/precios'
import { apartamentos as apartamentosEstaticos } from '@/lib/data/apartments'
import { ReservaAccionesButtons } from '@/components/owner/ReservaAccionesButtons'

const ESTADOS = ['pendiente_pago', 'pendiente_confirmacion', 'confirmada', 'completada', 'anulada'] as const
const POR_PAGINA = 20

interface Props {
  searchParams: { estado?: string; apartamento?: string; desde?: string; hasta?: string; page?: string }
}

export default async function OwnerReservasPage({ searchParams }: Props) {
  const supabase = await createClient()
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)
  const desdeIdx = (page - 1) * POR_PAGINA
  const hastaIdx = desdeIdx + POR_PAGINA - 1

  let query = supabase
    .from('reservas')
    .select(
      'id, codigo, fecha_checkin, fecha_checkout, estado, precio_total, apartamentos!inner(nombre, slug), profiles(nombre)',
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(desdeIdx, hastaIdx)

  if (searchParams.estado && ESTADOS.includes(searchParams.estado as (typeof ESTADOS)[number])) {
    query = query.eq('estado', searchParams.estado)
  }
  if (searchParams.apartamento) {
    query = query.eq('apartamentos.slug', searchParams.apartamento)
  }
  if (searchParams.desde) {
    query = query.gte('fecha_checkin', searchParams.desde)
  }
  if (searchParams.hasta) {
    query = query.lte('fecha_checkout', searchParams.hasta)
  }

  const { data: reservas, count } = await query
  const totalPaginas = Math.max(1, Math.ceil((count ?? 0) / POR_PAGINA))

  function hrefConFiltro(params: Record<string, string | undefined>) {
    const sp = new URLSearchParams()
    const combinado = { ...searchParams, ...params }
    Object.entries(combinado).forEach(([k, v]) => { if (v) sp.set(k, v) })
    const qs = sp.toString()
    return qs ? `/owner/reservas?${qs}` : '/owner/reservas'
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Gestión de reservas</h1>

        <div className="flex flex-wrap gap-2 mb-2">
          <Link href={hrefConFiltro({ estado: undefined, page: undefined })} className={`text-xs px-3 py-1.5 rounded-full border ${!searchParams.estado ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600'}`}>
            Todos los estados
          </Link>
          {ESTADOS.map((e) => (
            <Link
              key={e}
              href={hrefConFiltro({ estado: e, page: undefined })}
              className={`text-xs px-3 py-1.5 rounded-full border ${searchParams.estado === e ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600'}`}
            >
              {estadoReserva(e).label}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Link href={hrefConFiltro({ apartamento: undefined, page: undefined })} className={`text-xs px-3 py-1.5 rounded-full border ${!searchParams.apartamento ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600'}`}>
            Todos los apartamentos
          </Link>
          {apartamentosEstaticos.map((a) => (
            <Link
              key={a.slug}
              href={hrefConFiltro({ apartamento: a.slug, page: undefined })}
              className={`text-xs px-3 py-1.5 rounded-full border ${searchParams.apartamento === a.slug ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600'}`}
            >
              {a.nombre}
            </Link>
          ))}
        </div>

        <form className="flex flex-wrap items-end gap-3 mb-6 text-sm" method="get">
          {searchParams.estado && <input type="hidden" name="estado" value={searchParams.estado} />}
          {searchParams.apartamento && <input type="hidden" name="apartamento" value={searchParams.apartamento} />}
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase">Desde</span>
            <input type="date" name="desde" defaultValue={searchParams.desde} className="border border-gray-300 rounded px-2 py-1" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase">Hasta</span>
            <input type="date" name="hasta" defaultValue={searchParams.hasta} className="border border-gray-300 rounded px-2 py-1" />
          </label>
          <button type="submit" className="px-3 py-1.5 rounded bg-gray-900 text-white text-sm">Filtrar</button>
        </form>

        {!reservas || reservas.length === 0 ? (
          <p className="text-sm text-gray-500">No hay reservas con estos filtros.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-gray-400 uppercase text-xs border-b border-gray-200">
                  <th className="py-2 pr-4">Código</th>
                  <th className="py-2 pr-4">Apartamento</th>
                  <th className="py-2 pr-4">Usuario</th>
                  <th className="py-2 pr-4">Check-in</th>
                  <th className="py-2 pr-4">Check-out</th>
                  <th className="py-2 pr-4">Estado</th>
                  <th className="py-2 pr-4">Importe</th>
                  <th className="py-2 pr-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((r) => {
                  const estado = estadoReserva(r.estado)
                  return (
                    <tr key={r.id} className="border-b border-gray-100">
                      <td className="py-2 pr-4">
                        <Link href={`/owner/reservas/${r.id}`} className="text-red-700 hover:underline">{r.codigo}</Link>
                      </td>
                      <td className="py-2 pr-4">{r.apartamentos?.nombre}</td>
                      <td className="py-2 pr-4">{r.profiles?.nombre ?? '—'}</td>
                      <td className="py-2 pr-4">{r.fecha_checkin}</td>
                      <td className="py-2 pr-4">{r.fecha_checkout}</td>
                      <td className="py-2 pr-4"><Badge tone={estado.tone} variant="soft">{estado.label}</Badge></td>
                      <td className="py-2 pr-4">{formatearPrecio(r.precio_total)}</td>
                      <td className="py-2 pr-4"><ReservaAccionesButtons id={r.id} estado={r.estado} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPaginas > 1 && (
          <div className="flex items-center gap-2 mt-4 text-sm">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={hrefConFiltro({ page: String(p) })}
                className={`px-2 py-1 rounded ${p === page ? 'bg-gray-900 text-white' : 'text-gray-600 border border-gray-300'}`}
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
