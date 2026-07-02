import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireOwner } from '@/lib/utils/owner'
import { stripe } from '@/lib/stripe/client'

// POST /api/owner/reservas/[id]/anular — marca la reserva como anulada y reembolsa el pago si lo hubo
export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { user, isOwner } = await requireOwner(supabase)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isOwner) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { data: reserva, error: errorReserva } = await supabase
    .from('reservas')
    .select('id, estado')
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

  if (pago?.stripe_payment_intent_id) {
    await stripe.refunds.create({ payment_intent: pago.stripe_payment_intent_id })
    await supabase.from('pagos').update({ estado: 'reembolsado' }).eq('id', pago.id)
  }

  await supabase.from('reservas').update({ estado: 'anulada' }).eq('id', reserva.id)

  return NextResponse.json({ ok: true, reembolsado: !!pago })
}
