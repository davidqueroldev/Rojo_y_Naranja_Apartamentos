import Link from 'next/link'
import { startOfMonth, endOfMonth, addMonths, subMonths, getDaysInMonth, format, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import { AlertCircle, TrendingUp, CalendarCheck, Percent, Trophy, ChevronLeft, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { toneColor } from '@/lib/data/apartments'
import { formatearPrecio } from '@/lib/utils/precios'
import { fechasEnRango } from '@/lib/utils/reservas'
import { OwnerCalendar, type CalendarioEvento } from '@/components/owner/OwnerCalendar'
import { GraficoOcupacion } from '@/components/owner/GraficoOcupacion'
import { Card } from '@/components/ui/Card'

interface Props {
  searchParams: { mes?: string }
}

export default async function OwnerDashboardPage({ searchParams }: Props) {
  const supabase = await createClient()

  const ahora = searchParams.mes ? parse(searchParams.mes, 'yyyy-MM', new Date()) : new Date()
  const inicioMes = format(startOfMonth(ahora), 'yyyy-MM-dd')
  const finMes = format(endOfMonth(ahora), 'yyyy-MM-dd')
  const inicioMesSiguiente = format(addMonths(startOfMonth(ahora), 1), 'yyyy-MM-dd')
  const mesAnteriorParam = format(subMonths(startOfMonth(ahora), 1), 'yyyy-MM')
  const mesSiguienteParam = format(addMonths(startOfMonth(ahora), 1), 'yyyy-MM')

  const [{ data: reservasDelMes }, { data: pagosDelMes }, { data: apartamentos }, { data: pendientes }, { data: consultasPendientes }] =
    await Promise.all([
      supabase
        .from('reservas')
        .select('id, estado, apartamentos(nombre)')
        .gte('created_at', inicioMes)
        .lt('created_at', inicioMesSiguiente),
      supabase
        .from('pagos')
        .select('importe')
        .eq('estado', 'completado')
        .gte('created_at', inicioMes)
        .lt('created_at', inicioMesSiguiente),
      supabase.from('apartamentos').select('id, slug, nombre'),
      supabase
        .from('reservas')
        .select('id, codigo, fecha_checkin, apartamentos(nombre)')
        .eq('estado', 'pendiente_confirmacion')
        .order('fecha_checkin', { ascending: true }),
      supabase
        .from('consultas')
        .select('id, nombre, tipo, created_at')
        .eq('estado', 'pendiente_confirmacion')
        .order('created_at', { ascending: true }),
    ])

  const ingresosDelMes = (pagosDelMes ?? []).reduce((sum, p) => sum + Number(p.importe), 0)

  const porEstado = {
    confirmadas: (reservasDelMes ?? []).filter((r) => r.estado === 'confirmada' || r.estado === 'completada').length,
    pendientes: (reservasDelMes ?? []).filter((r) => r.estado === 'pendiente_confirmacion' || r.estado === 'pendiente_pago').length,
    anuladas: (reservasDelMes ?? []).filter((r) => r.estado === 'anulada').length,
  }

  const conteoPorApartamento = new Map<string, number>()
  for (const r of reservasDelMes ?? []) {
    if (r.estado === 'anulada' || !r.apartamentos?.nombre) continue
    conteoPorApartamento.set(r.apartamentos.nombre, (conteoPorApartamento.get(r.apartamentos.nombre) ?? 0) + 1)
  }
  const masReservado = Array.from(conteoPorApartamento.entries()).sort((a, b) => b[1] - a[1])[0]

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
        const hasta = r.fecha_checkout < finMes ? r.fecha_checkout : inicioMesSiguiente
        if (hasta <= desde) return total
        return total + fechasEnRango(desde, hasta).length
      }, 0)
    const slug = apt.slug as keyof typeof toneColor
    return { nombre: apt.nombre, porcentaje: Math.min(100, Math.round((nochesDelApartamento / diasEnMes) * 100)), color: toneColor[slug] ?? '#999' }
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Panel propietario</h1>
          <div className="flex items-center gap-2 text-sm">
            <Link href={`/owner/dashboard?mes=${mesAnteriorParam}`} className="p-1.5 rounded border border-[var(--border)] hover:bg-[var(--surface-sunken)]" aria-label="Mes anterior">
              <ChevronLeft size={16} />
            </Link>
            <span className="font-medium capitalize min-w-32 text-center">{format(ahora, 'MMMM yyyy', { locale: es })}</span>
            <Link href={`/owner/dashboard?mes=${mesSiguienteParam}`} className="p-1.5 rounded border border-[var(--border)] hover:bg-[var(--surface-sunken)]" aria-label="Mes siguiente">
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Card padding="sm">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">
              <CalendarCheck size={14} /> Reservas del mes
            </div>
            <div className="text-2xl font-bold">{reservasDelMes?.length ?? 0}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              {porEstado.confirmadas} confirmadas · {porEstado.pendientes} pendientes · {porEstado.anuladas} anuladas
            </div>
          </Card>
          <Card padding="sm">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">
              <TrendingUp size={14} /> Ingresos del mes
            </div>
            <div className="text-2xl font-bold">{formatearPrecio(ingresosDelMes)}</div>
          </Card>
          <Card padding="sm">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">
              <Trophy size={14} /> Más reservado
            </div>
            <div className="text-lg font-bold">{masReservado ? masReservado[0] : '—'}</div>
            {masReservado && <div className="text-xs text-[var(--text-muted)] mt-1">{masReservado[1]} reserva{masReservado[1] > 1 ? 's' : ''}</div>}
          </Card>
          <Card padding="sm">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs uppercase tracking-wide mb-1">
              <Percent size={14} /> Ocupación media
            </div>
            <div className="text-2xl font-bold">
              {ocupacionPorApartamento.length > 0
                ? Math.round(ocupacionPorApartamento.reduce((s, o) => s + o.porcentaje, 0) / ocupacionPorApartamento.length)
                : 0}%
            </div>
          </Card>
        </div>

        {pendientes && pendientes.length > 0 && (
          <div className="mb-6 rounded-lg p-4" style={{ border: '1px solid #EDDCB0', background: '#F7ECD6' }}>
            <div className="flex items-center gap-2 font-semibold text-sm mb-2" style={{ color: '#8A5E14' }}>
              <AlertCircle size={16} /> {pendientes.length} reserva{pendientes.length > 1 ? 's' : ''} pendiente{pendientes.length > 1 ? 's' : ''} de confirmación
            </div>
            <div className="flex flex-col gap-1">
              {pendientes.map((p) => (
                <Link key={p.id} href={`/owner/reservas/${p.id}`} className="text-sm hover:underline" style={{ color: '#8A5E14' }}>
                  {p.codigo} — {p.apartamentos?.nombre} — {p.fecha_checkin}
                </Link>
              ))}
            </div>
          </div>
        )}

        {consultasPendientes && consultasPendientes.length > 0 && (
          <div className="mb-6 rounded-lg p-4" style={{ border: '1px solid #EDDCB0', background: '#F7ECD6' }}>
            <div className="flex items-center gap-2 font-semibold text-sm mb-2" style={{ color: '#8A5E14' }}>
              <AlertCircle size={16} /> {consultasPendientes.length} consulta{consultasPendientes.length > 1 ? 's' : ''} pendiente{consultasPendientes.length > 1 ? 's' : ''} de confirmación
            </div>
            <Link href="/owner/consultas?estado=pendiente_confirmacion" className="text-sm hover:underline" style={{ color: '#8A5E14' }}>
              Ver consultas pendientes →
            </Link>
          </div>
        )}

        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2">Ocupación por apartamento</h2>
        <Card padding="sm" className="mb-6">
          <GraficoOcupacion data={ocupacionPorApartamento} />
        </Card>

        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2">Calendario global</h2>
        <Card padding="sm">
          <OwnerCalendar events={eventos} />
        </Card>
      </div>
    </main>
  )
}
