import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fechasEnRango } from '@/lib/utils/fechas'
import { apartamentos as apartamentosEstaticos } from '@/lib/data/apartments'

// GET /api/disponibilidad?apartamento=rojo&inicio=2026-07-01&fin=2026-07-07
// Público: devuelve las fechas ocupadas (bloqueos) de un apartamento en el rango.
// Lee bloqueos_calendario con el cliente de servicio y solo expone rangos de fechas.
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
  // Los apartamentos son estáticos (lib/data/apartments.ts).
  if (!apartamentosEstaticos.some((a) => a.slug === apartamento)) {
    return NextResponse.json({ error: 'Apartamento no encontrado' }, { status: 404 })
  }

  const supabase = createAdminClient()
  const { data: bloqueos } = await supabase
    .from('bloqueos_calendario')
    .select('fecha_inicio, fecha_fin')
    .eq('apartamento_slug', apartamento)
    .lt('fecha_inicio', fin)
    .gt('fecha_fin', inicio)

  const ocupadas = new Set<string>()
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
