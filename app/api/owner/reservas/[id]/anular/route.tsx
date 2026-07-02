import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireOwner } from '@/lib/utils/owner'
import { stripe } from '@/lib/stripe/client'
import { obtenerEmailUsuario } from '@/lib/utils/email'
import { enviarEmail } from '@/lib/email/send'
import { ReservaAnuladaEmail } from '@/emails/ReservaAnuladaEmail'

// POST /api/owner/reservas/[id]/anular — marca la reserva como anulada y reembolsa el pago si lo hubo
export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { user, isOwner } = await requireOwner(supabase)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isOwner) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { data: reserva, error: errorReserva } = await supabase
    .from('reservas')
    .select('id, estado, codigo, user_id, apartamentos(nombre)')
    .eq('id', params.id)
    .single()

  if (errorReserva || !reserva) {
    return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 })
  }
  if (reserva.estado === 'anulada' || reserva.estado === 'completada') {
    return NextResponse.json({ error: `No se puede anular una reserva ${reserva.estado}` }, { status: 409 })
  }

  const { data: pago } = await supabase
    .from('pagos')
    .select('id, stripe_payment_intent_id')
    .eq('reserva_id', reserva.id)
    .eq('estado', 'completado')
    .maybeSingle()

  let reembolsado = false
  if (pago?.stripe_payment_intent_id) {
    await stripe.refunds.create({ payment_intent: pago.stripe_payment_intent_id })
    await supabase.from('pagos').update({ estado: 'reembolsado' }).eq('id', pago.id)
    reembolsado = true
  }

  await supabase.from('reservas').update({ estado: 'anulada' }).eq('id', reserva.id)

  try {
    const [emailUsuario, { data: perfil }] = reserva.user_id
      ? await Promise.all([
          obtenerEmailUsuario(reserva.user_id),
          supabase.from('profiles').select('nombre').eq('id', reserva.user_id).single(),
        ])
      : [null, { data: null }]
    if (emailUsuario) {
      await enviarEmail({
        to: emailUsuario,
        subject: `Reserva anulada — [${reserva.codigo}]`,
        react: (
          <ReservaAnuladaEmail
            nombre={perfil?.nombre ?? 'Huésped'}
            codigo={reserva.codigo}
            apartamento={reserva.apartamentos?.nombre ?? 'Apartamento'}
            reembolsado={reembolsado}
            reservaLink={`${process.env.NEXT_PUBLIC_APP_URL}/user/reservas/${reserva.id}`}
          />
        ),
      })
    }
  } catch (e) {
    console.error('Error enviando email de reserva anulada', e)
  }

  return NextResponse.json({ ok: true, reembolsado })
}
