import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireOwner } from '@/lib/utils/owner'
import { obtenerEmailUsuario } from '@/lib/utils/email'
import { enviarEmail } from '@/lib/email/send'
import { ReservaConfirmadaEmail } from '@/emails/ReservaConfirmadaEmail'
import { formatearFecha } from '@/lib/utils/fechas'

// POST /api/owner/reservas/[id]/confirmar — pendiente_confirmacion -> confirmada
export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { user, isOwner } = await requireOwner(supabase)
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  if (!isOwner) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { data, error } = await supabase
    .from('reservas')
    .update({ estado: 'confirmada' })
    .eq('id', params.id)
    .eq('estado', 'pendiente_confirmacion')
    .select('codigo, user_id, fecha_checkin, fecha_checkout, apartamentos(nombre)')
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'La reserva no está pendiente de confirmación' }, { status: 409 })

  try {
    const [emailUsuario, { data: perfil }] = data.user_id
      ? await Promise.all([
          obtenerEmailUsuario(data.user_id),
          supabase.from('profiles').select('nombre').eq('id', data.user_id).single(),
        ])
      : [null, { data: null }]
    if (emailUsuario) {
      await enviarEmail({
        to: emailUsuario,
        subject: `✅ ¡Tu reserva está confirmada! [${data.codigo}]`,
        react: (
          <ReservaConfirmadaEmail
            nombre={perfil?.nombre ?? 'Huésped'}
            codigo={data.codigo}
            apartamento={data.apartamentos?.nombre ?? 'Apartamento'}
            checkin={formatearFecha(new Date(data.fecha_checkin))}
            checkout={formatearFecha(new Date(data.fecha_checkout))}
            reservaLink={`${process.env.NEXT_PUBLIC_APP_URL}/user/reservas/${params.id}`}
          />
        ),
      })
    }
  } catch (e) {
    console.error('Error enviando email de reserva confirmada', e)
  }

  return NextResponse.json({ ok: true })
}
