import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolverApartamento } from '@/lib/utils/reservas'

// GET /api/reservas — reservas del usuario autenticado (o todas si es owner, vía RLS)
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('reservas')
    .select('id, codigo, fecha_checkin, fecha_checkout, num_huespedes, precio_total, estado, created_at, apartamentos(slug, nombre)')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ reservas: data })
}

// POST /api/reservas
// Body: { apartamento: slug, fecha_checkin, fecha_checkout, num_huespedes, notas_usuario? }
export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Debes iniciar sesión para reservar' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  const { apartamento, fecha_checkin, fecha_checkout, num_huespedes, notas_usuario } = body as {
    apartamento?: string
    fecha_checkin?: string
    fecha_checkout?: string
    num_huespedes?: number
    notas_usuario?: string
  }

  if (!apartamento || !fecha_checkin || !fecha_checkout || !num_huespedes) {
    return NextResponse.json(
      { error: 'Campos requeridos: apartamento, fecha_checkin, fecha_checkout, num_huespedes' },
      { status: 400 }
    )
  }

  if (fecha_checkout <= fecha_checkin) {
    return NextResponse.json(
      { error: 'La fecha de checkout debe ser posterior a la de checkin' },
      { status: 400 }
    )
  }

  const apt = await resolverApartamento(supabase, apartamento)
  if (!apt) {
    return NextResponse.json({ error: 'Apartamento no encontrado' }, { status: 404 })
  }

  if (num_huespedes < 1 || num_huespedes > apt.capacidad_max) {
    return NextResponse.json(
      { error: `El número de huéspedes debe estar entre 1 y ${apt.capacidad_max}` },
      { status: 400 }
    )
  }

  const { data: disponible, error: errorDisponibilidad } = await supabase.rpc('check_disponibilidad', {
    p_apartamento_id: apt.id,
    p_fecha_inicio: fecha_checkin,
    p_fecha_fin: fecha_checkout,
  })

  if (errorDisponibilidad) {
    return NextResponse.json({ error: errorDisponibilidad.message }, { status: 500 })
  }
  if (!disponible) {
    return NextResponse.json({ error: 'Las fechas seleccionadas ya no están disponibles' }, { status: 409 })
  }

  const { data: precio_total, error: errorPrecio } = await supabase.rpc('calcular_precio_reserva', {
    p_apartamento_id: apt.id,
    p_fecha_inicio: fecha_checkin,
    p_fecha_fin: fecha_checkout,
  })

  if (errorPrecio) {
    return NextResponse.json({ error: errorPrecio.message }, { status: 500 })
  }

  const { data: reserva, error: errorInsert } = await supabase
    .from('reservas')
    .insert({
      // 'codigo' lo sobrescribe siempre el trigger set_reserva_codigo (ARN-YYYY-XXXX);
      // se pasa un valor solo para satisfacer el tipo generado, que no marca la columna como opcional.
      codigo: '',
      user_id: user.id,
      apartamento_id: apt.id,
      fecha_checkin,
      fecha_checkout,
      num_huespedes,
      precio_total,
      notas_usuario: notas_usuario || null,
    })
    .select('id, codigo, precio_total, estado')
    .single()

  if (errorInsert) {
    return NextResponse.json({ error: errorInsert.message }, { status: 500 })
  }

  return NextResponse.json(
    {
      reserva_id: reserva.id,
      codigo: reserva.codigo,
      precio_total: reserva.precio_total,
      estado: reserva.estado,
    },
    { status: 201 }
  )
}
