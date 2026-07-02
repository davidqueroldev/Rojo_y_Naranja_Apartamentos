import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generarRespuestaIA } from '@/lib/ia/chat'
import { enviarEmail } from '@/lib/email/send'
import { NuevoMensajeOwnerEmail } from '@/emails/NuevoMensajeOwnerEmail'

// POST /api/conversaciones/[id]/mensajes — Body: { contenido }
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const contenido = typeof body?.contenido === 'string' ? body.contenido.trim() : ''
  if (!contenido) return NextResponse.json({ error: 'Falta contenido' }, { status: 400 })

  const { data: esOwner } = await supabase.rpc('is_owner')
  const remitente = esOwner ? 'owner' : 'user'

  const { data: mensaje, error } = await supabase
    .from('mensajes')
    .insert({ conversacion_id: params.id, remitente, contenido })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (remitente === 'user') {
    const { data: conversacion } = await supabase
      .from('conversaciones')
      .select('modo_ia, profiles(nombre)')
      .eq('id', params.id)
      .single()

    if (conversacion?.modo_ia) {
      try {
        await generarRespuestaIA(supabase, params.id)
      } catch (e) {
        console.error('Error generando respuesta IA', e)
      }
    } else if (process.env.OWNER_EMAIL) {
      try {
        await enviarEmail({
          to: process.env.OWNER_EMAIL,
          subject: `💬 Nuevo mensaje de ${conversacion?.profiles?.nombre ?? 'un huésped'}`,
          react: (
            <NuevoMensajeOwnerEmail
              nombreHuesped={conversacion?.profiles?.nombre ?? 'Un huésped'}
              contenido={contenido}
              chatLink={`${process.env.NEXT_PUBLIC_APP_URL}/owner/chat/${params.id}`}
            />
          ),
        })
      } catch (e) {
        console.error('Error enviando email de nuevo mensaje', e)
      }
    }
  }

  return NextResponse.json({ id: mensaje.id }, { status: 201 })
}
