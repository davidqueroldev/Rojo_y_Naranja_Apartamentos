import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolverApartamento } from '@/lib/utils/reservas'
import { calcularDesglose, type PrecioEspecial } from '@/lib/utils/precios'

// GET /api/reservas/precio?apartamento=rojo&inicio=2025-07-01&fin=2025-07-07
// Previsualización del precio total antes de crear la reserva (sin efectos secundarios)
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

  const [{ data: precio_total, error: errorPrecio }, { data: especiales }] = await Promise.all([
    supabase.rpc('calcular_precio_reserva', {
      p_apartamento_id: apt.id,
      p_fecha_inicio: inicio,
      p_fecha_fin: fin,
    }),
    supabase
      .from('precios_especiales')
      .select('fecha_inicio, fecha_fin, precio_noche, nombre')
      .eq('apartamento_id', apt.id)
      .lt('fecha_inicio', fin)
      .gt('fecha_fin', inicio),
  ])

  if (errorPrecio) {
    return NextResponse.json({ error: errorPrecio.message }, { status: 500 })
  }

  const desglose = calcularDesglose(inicio, fin, apt.precio_noche_base, (especiales ?? []) as PrecioEspecial[])

  return NextResponse.json({ precio_total, desglose })
}
