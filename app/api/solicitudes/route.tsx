import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { formatearFecha } from '@/lib/utils/fechas'
import { apartamentos as apartamentosEstaticos } from '@/lib/data/apartments'
import { enviarEmail } from '@/lib/email/send'
import { SolicitudConfirmacionEmail } from '@/emails/SolicitudConfirmacionEmail'

type Tipo = 'generica' | 'reserva'

interface SolicitudBody {
  tipo?: Tipo
  nombre?: string
  apellidos?: string
  telefono?: string
  email?: string
  apartamento?: string       // slug (referencia lógica a lib/data/apartments.ts)
  fecha_checkin?: string
  fecha_checkout?: string
  num_huespedes?: number
  mensaje?: string
}

// POST /api/solicitudes
// Crea una solicitud pública (sin sesión) y envía el email de doble confirmación.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as SolicitudBody | null
  if (!body) {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  const { tipo, nombre, apellidos, telefono, email, apartamento, fecha_checkin, fecha_checkout, num_huespedes, mensaje } = body

  if (!tipo || (tipo !== 'generica' && tipo !== 'reserva')) {
    return NextResponse.json({ error: 'Campo requerido: tipo (generica|reserva)' }, { status: 400 })
  }

  if (!nombre || !telefono || !email) {
    return NextResponse.json(
      { error: 'Campos requeridos: nombre, telefono, email' },
      { status: 400 }
    )
  }

  let apartamentoSlug: string | null = null
  let apartamentoNombre: string | undefined

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
    // Los apartamentos son estáticos (lib/data/apartments.ts): validamos el slug ahí.
    const apt = apartamentosEstaticos.find((a) => a.slug === apartamento)
    if (!apt) {
      return NextResponse.json({ error: 'Apartamento no encontrado' }, { status: 404 })
    }
    apartamentoSlug = apt.slug
    apartamentoNombre = apt.nombre
  }

  const supabase = createAdminClient()
  const token = randomBytes(32).toString('hex')
  const tokenExpiraEn = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

  const { error: errorInsert } = await supabase
    .from('solicitudes')
    .insert({
      tipo,
      nombre,
      apellidos: apellidos || null,
      telefono,
      email,
      apartamento_slug: apartamentoSlug,
      fecha_checkin: tipo === 'reserva' ? fecha_checkin : null,
      fecha_checkout: tipo === 'reserva' ? fecha_checkout : null,
      num_huespedes: tipo === 'reserva' ? (num_huespedes ?? null) : null,
      mensaje: mensaje || null,
      estado: 'pendiente_email',
      token_confirmacion: token,
      token_expira_en: tokenExpiraEn,
    })

  if (errorInsert) {
    return NextResponse.json({ error: errorInsert.message }, { status: 500 })
  }

  const checkinFmt = tipo === 'reserva' && fecha_checkin ? formatearFecha(new Date(fecha_checkin)) : undefined
  const checkoutFmt = tipo === 'reserva' && fecha_checkout ? formatearFecha(new Date(fecha_checkout)) : undefined

  try {
    await enviarEmail({
      to: email,
      subject: tipo === 'reserva'
        ? 'Confirma tu solicitud de reserva — Apartamentos Rojo y Naranja'
        : 'Confirma tu consulta — Apartamentos Rojo y Naranja',
      react: (
        <SolicitudConfirmacionEmail
          nombre={nombre}
          confirmLink={`${process.env.NEXT_PUBLIC_APP_URL}/solicitud/confirmar/${token}`}
          tipo={tipo}
          apartamento={apartamentoNombre}
          checkin={checkinFmt}
          checkout={checkoutFmt}
        />
      ),
    })
  } catch (mailErr) {
    console.error('[solicitudes] Error enviando email:', mailErr)
    return NextResponse.json(
      { error: 'No se pudo enviar el email de confirmación. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
