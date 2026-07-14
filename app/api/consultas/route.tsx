import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { resolverApartamento } from '@/lib/utils/reservas'
import { enviarEmail } from '@/lib/email/send'
import { ConsultaConfirmacionEmail } from '@/emails/ConsultaConfirmacionEmail'

type Tipo = 'generica' | 'reserva'

interface ConsultaBody {
  tipo?: Tipo
  nombre?: string
  apellidos?: string
  telefono?: string
  email?: string
  apartamento?: string
  fecha_checkin?: string
  fecha_checkout?: string
  mensaje?: string
}

// POST /api/consultas
// Body: { tipo: 'generica'|'reserva', nombre, apellidos?, telefono, email, apartamento?, fecha_checkin?, fecha_checkout?, mensaje? }
// Crea una consulta pública (sin sesión) y envía el email de doble confirmación.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as ConsultaBody | null
  if (!body) {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  const { tipo, nombre, apellidos, telefono, email, apartamento, fecha_checkin, fecha_checkout, mensaje } = body

  if (!tipo || (tipo !== 'generica' && tipo !== 'reserva')) {
    return NextResponse.json({ error: 'Campo requerido: tipo (generica|reserva)' }, { status: 400 })
  }

  if (!nombre || !telefono || !email) {
    return NextResponse.json(
      { error: 'Campos requeridos: nombre, telefono, email' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()

  let apartamentoId: string | null = null

  if (tipo === 'reserva') {
    if (!apartamento || !fecha_checkin || !fecha_checkout) {
      return NextResponse.json(
        { error: 'Campos requeridos para una reserva: apartamento, fecha_checkin, fecha_checkout' },
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
    apartamentoId = apt.id
  }

  const token = randomBytes(32).toString('hex')
  const tokenExpiraEn = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

  const { error: errorInsert } = await supabase
    .from('consultas')
    .insert({
      tipo,
      nombre,
      apellidos: apellidos || null,
      telefono,
      email,
      apartamento_id: apartamentoId,
      fecha_checkin: tipo === 'reserva' ? fecha_checkin : null,
      fecha_checkout: tipo === 'reserva' ? fecha_checkout : null,
      mensaje: mensaje || null,
      estado: 'pendiente_email',
      token_confirmacion: token,
      token_expira_en: tokenExpiraEn,
    })

  if (errorInsert) {
    return NextResponse.json({ error: errorInsert.message }, { status: 500 })
  }

  try {
    await enviarEmail({
      to: email,
      subject: 'Confirma tu consulta — Apartamentos Rojo y Naranja',
      react: (
        <ConsultaConfirmacionEmail
          nombre={nombre}
          confirmLink={`${process.env.NEXT_PUBLIC_APP_URL}/confirmar-consulta/${token}`}
        />
      ),
    })
  } catch (mailErr) {
    console.error('[consultas] Error enviando email:', mailErr)
    return NextResponse.json(
      { error: 'No se pudo enviar el email de confirmación. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
