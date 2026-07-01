import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { stripe } from '@/lib/stripe/client'

// POST /api/checkout — Body: { reserva_id }
// Crea una Stripe Checkout Session para una reserva ya existente en estado 'pendiente_pago'.
export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const reserva_id = body?.reserva_id as string | undefined
  if (!reserva_id) {
    return NextResponse.json({ error: 'Falta reserva_id' }, { status: 400 })
  }

  // La política RLS de SELECT en 'reservas' solo permite ver la propia reserva,
  // así que esta consulta ya actúa como comprobación de propiedad.
  const { data: reserva, error } = await supabase
    .from('reservas')
    .select('id, codigo, estado, precio_total, fecha_checkin, fecha_checkout, apartamentos(nombre)')
    .eq('id', reserva_id)
    .single()

  if (error || !reserva) {
    return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 })
  }

  if (reserva.estado !== 'pendiente_pago') {
    return NextResponse.json({ error: 'Esta reserva ya no está pendiente de pago' }, { status: 409 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${reserva.apartamentos?.nombre ?? 'Apartamento'} — ${reserva.codigo}`,
          description: `${reserva.fecha_checkin} → ${reserva.fecha_checkout}`,
        },
        unit_amount: Math.round(reserva.precio_total * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    customer_email: user.email,
    metadata: { reserva_id: reserva.id },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/user/reservas/${reserva.id}?pago=ok`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/user/reservas/${reserva.id}?pago=cancelado`,
  })

  // Requiere service role: no hay política RLS de UPDATE para el propio usuario sobre 'reservas'.
  const admin = createAdminClient()
  await admin.from('reservas').update({ stripe_session_id: session.id }).eq('id', reserva.id)

  return NextResponse.json({ url: session.url })
}
