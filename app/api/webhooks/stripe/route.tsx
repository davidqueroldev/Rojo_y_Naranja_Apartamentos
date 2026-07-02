import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { construirEvento } from '@/lib/stripe/webhooks'
import { createAdminClient } from '@/lib/supabase/admin'
import { obtenerEmailUsuario } from '@/lib/utils/email'
import { enviarEmail } from '@/lib/email/send'
import { PagoRecibidoEmail } from '@/emails/PagoRecibidoEmail'
import { NuevaReservaOwnerEmail } from '@/emails/NuevaReservaOwnerEmail'
import { formatearPrecio } from '@/lib/utils/precios'
import { formatearFecha } from '@/lib/utils/fechas'

interface ReservaPagada {
  codigo: string
  user_id: string | null
  fecha_checkin: string
  fecha_checkout: string
  num_huespedes: number
  precio_total: number
  apartamentos: { nombre: string } | null
}

async function notificarPagoRecibido(reservaId: string, reserva: ReservaPagada) {
  const admin = createAdminClient()
  const apartamento = reserva.apartamentos?.nombre ?? 'Apartamento'
  const checkin = formatearFecha(new Date(reserva.fecha_checkin))
  const checkout = formatearFecha(new Date(reserva.fecha_checkout))
  const precioTotal = formatearPrecio(Number(reserva.precio_total))

  const [emailUsuario, { data: perfil }] = reserva.user_id
    ? await Promise.all([
        obtenerEmailUsuario(reserva.user_id),
        admin.from('profiles').select('nombre').eq('id', reserva.user_id).single(),
      ])
    : [null, { data: null }]
  const nombreHuesped = perfil?.nombre ?? 'Huésped'

  if (emailUsuario) {
    await enviarEmail({
      to: emailUsuario,
      subject: `Reserva recibida · Pendiente confirmación [${reserva.codigo}]`,
      react: (
        <PagoRecibidoEmail
          nombre={nombreHuesped}
          codigo={reserva.codigo}
          apartamento={apartamento}
          checkin={checkin}
          checkout={checkout}
          huespedes={reserva.num_huespedes}
          precioTotal={precioTotal}
          reservaLink={`${process.env.NEXT_PUBLIC_APP_URL}/user/reservas/${reservaId}`}
        />
      ),
    })
  }

  if (process.env.OWNER_EMAIL) {
    await enviarEmail({
      to: process.env.OWNER_EMAIL,
      subject: `🔔 Nueva reserva pendiente — [${reserva.codigo}]`,
      react: (
        <NuevaReservaOwnerEmail
          nombreHuesped={nombreHuesped}
          codigo={reserva.codigo}
          apartamento={apartamento}
          checkin={checkin}
          checkout={checkout}
          huespedes={reserva.num_huespedes}
          precioTotal={precioTotal}
          reservaLink={`${process.env.NEXT_PUBLIC_APP_URL}/owner/reservas/${reservaId}`}
        />
      ),
    })
  }
}

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
        const { data: reservaActualizada } = await admin
          .from('reservas')
          .update({ estado: 'pendiente_confirmacion' })
          .eq('id', reserva_id)
          .eq('estado', 'pendiente_pago')
          .select('codigo, user_id, fecha_checkin, fecha_checkout, num_huespedes, precio_total, apartamentos(nombre)')
          .maybeSingle()

        await admin.from('pagos').insert({
          reserva_id,
          stripe_payment_intent_id: payment_intent_id,
          importe: (session.amount_total ?? 0) / 100,
          estado: 'completado',
          tipo: 'total',
        })

        if (reservaActualizada) {
          try {
            await notificarPagoRecibido(reserva_id, reservaActualizada)
          } catch (e) {
            console.error('Error enviando emails de pago recibido', e)
          }
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
