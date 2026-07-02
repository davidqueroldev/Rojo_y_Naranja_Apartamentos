import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'var(--space-6) var(--container-pad)' }}>
      <div style={{ width: '100%', maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image src="/logo-rojo.png" alt="Rojo y Naranja" width={160} height={48} style={{ height: 40, width: 'auto' }} priority />
        <p style={{ marginTop: 'var(--space-2)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
          Morella, Castellón
        </p>
      </div>
      <div style={{ width: '100%', maxWidth: 420, margin: 'var(--space-6) auto 0' }}>
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 'var(--space-6) var(--space-5)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
