import Link from 'next/link'
import { startOfMonth, endOfMonth, addMonths, subMonths, getDaysInMonth, format } from 'date-fns'
import { AlertCircle, TrendingUp, CalendarCheck, Percent } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { toneColor } from '@/lib/data/apartments'
import { formatearPrecio } from '@/lib/utils/precios'
import { fechasEnRango } from '@/lib/utils/reservas'
import { OwnerCalendar, type CalendarioEvento } from '@/components/owner/OwnerCalendar'

export default async function OwnerDashboardPage() {
  const supabase = await createClient()

  const ahora = new Date()
  const inicioMes = format(startOfMonth(ahora), 'yyyy-MM-dd')
  const finMes = format(endOfMonth(ahora), 'yyyy-MM-dd')

  const [{ count: reservasDelMes }, { data: pagosDelMes }, { data: apartamentos }, { data: pendientes }] =
    await Promise.all([
      supabase
        .from('reservas')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', inicioMes)
        .lt('created_at', format(addMonths(startOfMonth(ahora), 1), 'yyyy-MM-dd')),
      supabase
        .from('pagos')
        .select('importe')
        .eq('estado', 'completado')
        .gte('created_at', inicioMes)
        .lt('created_at', format(addMonths(startOfMonth(ahora), 1), 'yyyy-MM-dd')),
      supabase.from('apartamentos').select('id, slug, nombre'),
      supabase
        .from('reservas')
        .select('id, codigo, fecha_checkin, apartamentos(nombre)')
        .eq('estado', 'pendiente_confirmacion')
        .order('fecha_checkin', { ascending: true }),
    ])

  const ingresosDelMes = (pagosDelMes ?? []).reduce((sum, p) => sum + Number(p.importe), 0)

  // Reservas para calcular ocupación + poblar el calendario (ventana: mes anterior a +2 meses)
  const inicioVentana = format(subMonths(startOfMonth(ahora), 1), 'yyyy-MM-dd')
  const finVentana = format(addMonths(startOfMonth(ahora), 3), 'yyyy-MM-dd')

  const { data: reservasVentana } = await supabase
    .from('reservas')
    .select('codigo, fecha_checkin, fecha_checkout, estado, apartamentos(slug, nombre)')
    .neq('estado', 'anulada')
    .lt('fecha_checkin', finVentana)
    .gt('fecha_checkout', inicioVentana)

  const diasEnMes = getDaysInMonth(ahora)
  const ocupacionPorApartamento = (apartamentos ?? []).map((apt) => {
    const nochesDelApartamento = (reservasVentana ?? [])
      .filter((r) => r.apartamentos?.slug === apt.slug)
      .reduce((total, r) => {
        const desde = r.fecha_checkin > inicioMes ? r.fecha_checkin : inicioMes
        const hasta = r.fecha_checkout < finMes ? r.fecha_checkout : format(addMonths(startOfMonth(ahora), 1), 'yyyy-MM-dd')
        if (hasta <= desde) return total
        return total + fechasEnRango(desde, hasta).length
      }, 0)
    return { nombre: apt.nombre, porcentaje: Math.min(100, Math.round((nochesDelApartamento / diasEnMes) * 100)) }
  })

  const eventos: CalendarioEvento[] = (reservasVentana ?? []).map((r) => {
    const slug = r.apartamentos?.slug as keyof typeof toneColor | undefined
    return {
      title: `${r.apartamentos?.nombre ?? 'Apartamento'} · ${r.codigo}`,
      start: new Date(`${r.fecha_checkin}T00:00:00`),
      end: new Date(`${r.fecha_checkout}T00:00:00`),
      color: slug ? toneColor[slug] : '#999',
    }
  })

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Panel propietario</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-1">
              <CalendarCheck size={14} /> Reservas del mes
            </div>
            <div className="text-2xl font-bold">{reservasDelMes ?? 0}</div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-1">
              <TrendingUp size={14} /> Ingresos del mes
            </div>
            <div className="text-2xl font-bold">{formatearPrecio(ingresosDelMes)}</div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-1">
              <Percent size={14} /> Ocupación por apartamento
            </div>
            <div className="flex flex-col gap-1 mt-1">
              {ocupacionPorApartamento.map((o) => (
                <div key={o.nombre} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{o.nombre}</span>
                  <span className="font-semibold">{o.porcentaje}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {pendientes && pendientes.length > 0 && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm mb-2">
              <AlertCircle size={16} /> {pendientes.length} reserva{pendientes.length > 1 ? 's' : ''} pendiente{pendientes.length > 1 ? 's' : ''} de confirmación
            </div>
            <div className="flex flex-col gap-1">
              {pendientes.map((p) => (
                <Link key={p.id} href={`/owner/reservas/${p.id}`} className="text-sm text-amber-700 hover:underline">
                  {p.codigo} — {p.apartamentos?.nombre} — {p.fecha_checkin}
                </Link>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">Calendario global</h2>
        <div className="rounded-lg border border-gray-200 p-4">
          <OwnerCalendar events={eventos} />
        </div>
      </div>
    </main>
  )
}
