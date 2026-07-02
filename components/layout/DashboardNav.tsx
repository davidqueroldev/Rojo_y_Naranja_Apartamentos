'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface NavLink {
  href: string
  label: string
  disabled?: boolean
}

const LINKS: Record<'user' | 'owner', NavLink[]> = {
  user: [
    { href: '/user/dashboard', label: 'Panel' },
    { href: '/user/reservas', label: 'Mis reservas' },
    { href: '/user/chat', label: 'Chat' },
  ],
  owner: [
    { href: '/owner/dashboard', label: 'Panel' },
    { href: '/owner/reservas', label: 'Reservas' },
    { href: '/owner/precios', label: 'Precios' },
    { href: '/owner/apartamentos', label: 'Disponibilidad' },
    { href: '/owner/chat', label: 'Chat' },
  ],
}

export function DashboardNav({ role, nombre }: { role: 'user' | 'owner'; nombre?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function cerrarSesion() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  function linkStyle(active: boolean) {
    return {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      fontWeight: active ? 600 : 500,
      color: active ? 'var(--accent)' : 'var(--text-body)',
      textDecoration: 'none',
    }
  }

  return (
    <nav style={{ background: 'var(--surface-card)', borderBottom: 'var(--hairline)' }}>
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 var(--container-pad)',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Image src="/logo-rojo.png" alt="Rojo y Naranja" width={120} height={36} style={{ height: 28, width: 'auto' }} priority />
        </Link>

        {/* Desktop links */}
        <div className="ryn-nav-desktop" style={{ flex: 1 }}>
          {LINKS[role].map((link) =>
            link.disabled ? (
              <span key={link.href} style={{ ...linkStyle(false), color: 'var(--ryn-stone-2)', cursor: 'not-allowed' }} title="Próximamente">
                {link.label}
              </span>
            ) : (
              <Link key={link.href} href={link.href} style={linkStyle(!!pathname?.startsWith(link.href))}>
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="ryn-nav-desktop" style={{ flex: 'none' }}>
          {nombre && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{nombre}</span>}
          <button
            onClick={cerrarSesion}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
            }}
          >
            <LogOut size={14} /> Salir
          </button>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="ryn-nav-mobile"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          style={{ background: 'none', border: 'none', color: 'var(--text-heading)', cursor: 'pointer', padding: 4 }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            borderTop: 'var(--hairline)',
            padding: 'var(--space-3) var(--container-pad) var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {LINKS[role].map((link) =>
            link.disabled ? (
              <span key={link.href} style={{ ...linkStyle(false), color: 'var(--ryn-stone-2)', padding: '10px 0', cursor: 'not-allowed' }}>
                {link.label}
              </span>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ ...linkStyle(!!pathname?.startsWith(link.href)), padding: '10px 0', borderBottom: '1px solid var(--border)' }}
              >
                {link.label}
              </Link>
            )
          )}
          {nombre && (
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', padding: '10px 0 0' }}>
              {nombre}
            </span>
          )}
          <button
            onClick={cerrarSesion}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
              padding: '10px 0 0',
            }}
          >
            <LogOut size={14} /> Salir
          </button>
        </div>
      )}
    </nav>
  )
}
