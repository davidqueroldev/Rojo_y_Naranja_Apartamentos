import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { construirEvento } from '@/lib/stripe/webhooks'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Falta la cabecera stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = construirEvento(body, signature)
  } catch {
    return NextResponse.json({ error: 'Firma de webhook inválida' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const reserva_id = session.metadata?.reserva_id
    const payment_intent_id = session.payment_intent as string | null

    if (reserva_id && payment_intent_id) {
      const admin = createAdminClient()

      // Idempotencia: si ya existe un pago para este payment_intent, no reprocesar.
      const { data: pagoExistente } = await admin
        .from('pagos')
        .select('id')
        .eq('stripe_payment_intent_id', payment_intent_id)
        .maybeSingle()

      if (!pagoExistente) {
        await admin
          .from('reservas')
          .update({ estado: 'pendiente_confirmacion' })
          .eq('id', reserva_id)
          .eq('estado', 'pendiente_pago')

        await admin.from('pagos').insert({
          reserva_id,
          stripe_payment_intent_id: payment_intent_id,
          importe: (session.amount_total ?? 0) / 100,
          estado: 'completado',
          tipo: 'total',
        })
      }
    }
  }

  return NextResponse.json({ received: true })
}
