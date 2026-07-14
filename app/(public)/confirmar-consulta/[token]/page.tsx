import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { info } from '@/lib/data/apartments'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-page)',
        padding: 'var(--space-6)',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: '100%',
          background: 'var(--surface-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-7)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-2xl)',
        color: 'var(--text-heading)',
        margin: '0 0 12px',
        fontWeight: 600,
      }}
    >
      {children}
    </h1>
  )
}

function Texto({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--text-base)',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
        margin: '0 0 8px',
      }}
    >
      {children}
    </p>
  )
}

function VolverLink() {
  return (
    <Link
      href="/"
      style={{
        display: 'inline-block',
        marginTop: 'var(--space-5)',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--text-sm)',
        color: 'var(--accent)',
        fontWeight: 600,
      }}
    >
      Volver al inicio
    </Link>
  )
}

export default async function ConfirmarConsultaPage({ params }: { params: { token: string } }) {
  const supabase = createAdminClient()

  const { data: consulta } = await supabase
    .from('consultas')
    .select('id, estado, token_expira_en')
    .eq('token_confirmacion', params.token)
    .single()

  if (!consulta) {
    return (
      <Shell>
        <Titulo>Enlace no válido</Titulo>
        <Texto>Este enlace de confirmación no existe o ya no es válido.</Texto>
        <VolverLink />
      </Shell>
    )
  }

  if (consulta.estado !== 'pendiente_email') {
    return (
      <Shell>
        <Titulo>Consulta ya confirmada</Titulo>
        <Texto>Esta consulta ya fue confirmada anteriormente. No es necesario hacer nada más.</Texto>
        <VolverLink />
      </Shell>
    )
  }

  const expirada = consulta.token_expira_en !== null && new Date(consulta.token_expira_en) < new Date()

  if (expirada) {
    await supabase
      .from('consultas')
      .update({ estado: 'expirada' })
      .eq('id', consulta.id)

    return (
      <Shell>
        <Titulo>Enlace caducado</Titulo>
        <Texto>Este enlace de confirmación ha caducado. Puedes escribirnos directamente y te ayudamos con tu consulta:</Texto>
        <Texto>
          <strong>{info.email}</strong>
        </Texto>
        <Texto>
          <strong>{info.telefono}</strong>
        </Texto>
        <VolverLink />
      </Shell>
    )
  }

  await supabase
    .from('consultas')
    .update({ estado: 'pendiente_confirmacion', confirmada_en: new Date().toISOString() })
    .eq('id', consulta.id)

  return (
    <Shell>
      <Titulo>¡Consulta confirmada!</Titulo>
      <Texto>Hemos recibido tu solicitud, te contactaremos pronto.</Texto>
      <VolverLink />
    </Shell>
  )
}
