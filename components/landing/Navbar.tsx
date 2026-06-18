'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Shield, Menu, X, ChevronDown } from 'lucide-react'
import { apartamentos, toneColor } from '@/lib/data/apartments'

const navLinks = [
  { label: 'Morella', href: '#morella' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
]

const navLinkStyle = {
  fontFamily: 'var(--font-ui)',
  fontWeight: 500,
  fontVariantCaps: 'all-small-caps' as const,
  letterSpacing: '0.08em',
  fontSize: 15,
  color: 'var(--text-on-dark)',
  textDecoration: 'none',
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [aptsOpen, setAptsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(20,17,15,0.95)' : 'rgba(20,17,15,0.4)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: scrolled ? '1px solid var(--border-on-dark)' : '1px solid transparent',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '12px var(--container-pad)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
          <Image src="/logo-white.png" alt="Rojo y Naranja" width={120} height={36} style={{ height: 34, width: 'auto' }} priority />
          <span style={{ width: 1, height: 26, background: 'var(--border-on-dark)', flexShrink: 0 }} className="ryn-nav-tagline" />
          <span className="ryn-nav-tagline" style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 500,
            fontVariantCaps: 'all-small-caps',
            letterSpacing: '0.1em',
            fontSize: 13,
            color: 'var(--ryn-plata)',
            whiteSpace: 'nowrap',
          }}>
            tu lugar en Morella
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="ryn-nav-desktop">
          {/* Apartments dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setAptsOpen(true)}
            onMouseLeave={() => setAptsOpen(false)}
          >
            <button style={{
              ...navLinkStyle,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: 0,
            }}>
              Apartamentos <ChevronDown size={13} style={{ opacity: 0.7, transition: 'transform var(--dur-fast) var(--ease-out)', transform: aptsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {aptsOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(20,17,15,0.97)',
                border: '1px solid var(--border-on-dark)',
                borderRadius: 'var(--radius-md)',
                padding: '6px',
                minWidth: 210,
                backdropFilter: 'blur(12px)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 100,
              }}>
                {apartamentos.map(apt => (
                  <Link
                    key={apt.slug}
                    href={`#${apt.slug}`}
                    onClick={() => setAptsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-ui)',
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--text-on-dark)',
                      transition: 'background var(--dur-fast) var(--ease-out)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: toneColor[apt.tone], flexShrink: 0 }} />
                    {apt.nombre}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} style={navLinkStyle}>
              {link.label}
            </Link>
          ))}

          <Button variant="sand" size="sm" href="#rojo">Reservar</Button>
          <Link href="/login" title="Acceso propietario" style={{ display: 'inline-flex', color: 'var(--text-on-dark-muted)' }}>
            <Shield size={18} />
          </Link>
        </nav>

        {/* Mobile: CTA + hamburger */}
        <div className="ryn-nav-mobile">
          <Button variant="sand" size="sm" href="#rojo">Reservar</Button>
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'inline-flex', padding: 4 }}
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          background: 'rgba(20,17,15,0.98)',
          borderTop: '1px solid var(--border-on-dark)',
          padding: '16px var(--container-pad) 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          {/* Apartments sub-links */}
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: 10,
            color: 'var(--ryn-plata)',
            padding: '10px 0 6px',
          }}>
            Apartamentos
          </div>
          {apartamentos.map(apt => (
            <Link
              key={apt.slug}
              href={`#${apt.slug}`}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                fontSize: 15,
                color: 'var(--text-on-dark)',
                textDecoration: 'none',
                padding: '8px 0 8px 12px',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: toneColor[apt.tone], flexShrink: 0 }} />
              {apt.nombre}
            </Link>
          ))}

          <div style={{ height: 1, background: 'var(--border-on-dark)', margin: '6px 0' }} />

          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setOpen(false)} style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              fontVariantCaps: 'all-small-caps',
              letterSpacing: '0.08em',
              fontSize: 15,
              color: 'var(--text-on-dark)',
              textDecoration: 'none',
              padding: '10px 0',
              borderBottom: '1px solid var(--border-on-dark)',
            }}>
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} style={{
            display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-on-dark-muted)',
            fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', paddingTop: 12, textDecoration: 'none',
          }}>
            <Shield size={16} /> Acceso propietario
          </Link>
        </div>
      )}
    </header>
  )
}
