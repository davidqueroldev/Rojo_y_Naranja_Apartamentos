import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { enviarEmail } from '@/lib/email/send'
import { ConfirmacionEmail } from '@/emails/ConfirmacionEmail'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password, nombre } = body as { email?: string; password?: string; nombre?: string }

  if (!email || !password || !nombre) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres.' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'signup',
    email,
    password,
    options: {
      data: { nombre },
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm-email`,
    },
  })

  if (error) {
    const msg = error.message.includes('already registered')
      ? 'Este email ya está registrado.'
      : error.message
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  const confirmLink = data.properties?.action_link
  if (!confirmLink) {
    return NextResponse.json({ error: 'No se pudo generar el enlace de confirmación.' }, { status: 500 })
  }

  try {
    await enviarEmail({
      to: email,
      subject: 'Confirma tu cuenta — Apartamentos Rojo y Naranja',
      react: <ConfirmacionEmail nombre={nombre} confirmLink={confirmLink} />,
    })
  } catch (mailErr) {
    console.error('[register] Error enviando email:', mailErr)
    return NextResponse.json(
      { error: 'Cuenta creada, pero no se pudo enviar el email. Contacta con nosotros.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
