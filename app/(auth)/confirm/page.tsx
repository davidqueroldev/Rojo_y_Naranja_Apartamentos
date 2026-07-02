import Link from 'next/link'

export default function ConfirmPage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>✉️</div>
      <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>Revisa tu email</h2>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
        Te hemos enviado un enlace de confirmación.
      </p>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>
        Haz clic en él para activar tu cuenta y acceder.
      </p>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ryn-stone-2)', marginBottom: 'var(--space-6)' }}>
        ¿No lo encuentras? Revisa la carpeta de spam.
      </p>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-5)' }}>
        <Link href="/login" style={{ color: 'var(--accent)', fontSize: 'var(--text-sm)' }}>Volver al inicio de sesión</Link>
      </div>
    </div>
  )
}
