import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolverApartamento, fechasEnRango } from '@/lib/utils/reservas'

// GET /api/disponibilidad?apartamento=rojo&inicio=2025-07-01&fin=2025-07-07
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const apartamento = searchParams.get('apartamento')
  const inicio = searchParams.get('inicio')
  const fin = searchParams.get('fin')

  if (!apartamento || !inicio || !fin) {
    return NextResponse.json(
      { error: 'Parámetros requeridos: apartamento, inicio, fin' },
      { status: 400 }
    )
  }

  if (fin <= inicio) {
    return NextResponse.json(
      { error: 'La fecha fin debe ser posterior a la fecha inicio' },
      { status: 400 }
    )
  }

  const supabase = await createClient()
  const apt = await resolverApartamento(supabase, apartamento)
  if (!apt) {
    return NextResponse.json({ error: 'Apartamento no encontrado' }, { status: 404 })
  }

  const [{ data: reservas }, { data: bloqueos }] = await Promise.all([
    supabase
      .from('reservas')
      .select('fecha_checkin, fecha_checkout')
      .eq('apartamento_id', apt.id)
      .not('estado', 'in', '(anulada,completada)')
      .lt('fecha_checkin', fin)
      .gt('fecha_checkout', inicio),
    supabase
      .from('bloqueos_calendario')
      .select('fecha_inicio, fecha_fin')
      .eq('apartamento_id', apt.id)
      .lt('fecha_inicio', fin)
      .gt('fecha_fin', inicio),
  ])

  const ocupadas = new Set<string>()
  for (const r of reservas ?? []) {
    const desde = r.fecha_checkin > inicio ? r.fecha_checkin : inicio
    const hasta = r.fecha_checkout < fin ? r.fecha_checkout : fin
    fechasEnRango(desde, hasta).forEach((f) => ocupadas.add(f))
  }
  for (const b of bloqueos ?? []) {
    const desde = b.fecha_inicio > inicio ? b.fecha_inicio : inicio
    const hasta = b.fecha_fin < fin ? b.fecha_fin : fin
    fechasEnRango(desde, hasta).forEach((f) => ocupadas.add(f))
  }

  const fechas_ocupadas = Array.from(ocupadas).sort()

  return NextResponse.json({
    disponible: fechas_ocupadas.length === 0,
    fechas_ocupadas,
  })
}
