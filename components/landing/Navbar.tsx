'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Menu, X, ChevronDown } from 'lucide-react'
import { apartamentos, toneColor } from '@/lib/data/apartments'
import { scrollToHash } from '@/lib/utils/scroll'

const navLinks = [
  { label: 'Morella', href: '#morella' },
  { label: 'Ubicación', href: '#ubicacion' },
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
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [aptsOpen, setAptsOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // El desplegable "Los apartamentos" se abre con onMouseEnter, pero en
  // pantallas táctiles no existe onMouseLeave (no hay puntero que "se vaya"),
  // así que sin esto se queda abierto para siempre salvo que el usuario
  // seleccione un apartamento. Cerramos con un toque/click fuera del navbar,
  // válido tanto para el desplegable de escritorio como para el drawer móvil.
  useEffect(() => {
    if (!aptsOpen && !open) return
    function onPointerDown(e: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setAptsOpen(false)
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [aptsOpen, open])

  // Si llegamos a la home con un hash en la URL (enlace desde otra página,
  // recarga directa de /#slug, etc.) hacemos el scroll nosotros mismos en
  // vez de confiar en el salto nativo del navegador, que no siempre es
  // consistente entre navegadores/versiones de Next.
  useEffect(() => {
    if (!isHome || !window.location.hash) return
    const hash = window.location.hash
    const raf = requestAnimationFrame(() => scrollToHash(hash))
    return () => cancelAnimationFrame(raf)
  }, [isHome])

  // Repite el scroll incluso si ya estamos posicionados en ese mismo hash
  // (un <a href="#x"> normal no vuelve a saltar si la URL no cambia), y en
  // cualquier otra página navega primero a la home con el hash y deja que
  // el efecto de arriba haga el scroll una vez montada.
  const handleAnchorClick = useCallback((e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, hash: string) => {
    if (isHome) {
      e.preventDefault()
      window.history.pushState(null, '', `/${hash}`)
      scrollToHash(hash)
    }
    setAptsOpen(false)
    setOpen(false)
  }, [isHome])

  const handleLogoClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault()
      window.history.pushState(null, '', '/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setOpen(false)
  }, [isHome])

  return (
    <header ref={headerRef} style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(20,17,15,0.95)' : 'rgba(20,17,15,0.95)',
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
        <Link href="/" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <Image src="/logo-white-b.png" alt="Rojo y Naranja" width={120} height={36} style={{ height: 34, width: 'auto' }} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="ryn-nav-desktop">
          {/* Apartments dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setAptsOpen(true)}
            onMouseLeave={() => setAptsOpen(false)}
          >
            <button
              onClick={() => setAptsOpen(true)}
              style={{
                ...navLinkStyle,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: 0,
              }}>
              Los apartamentos <ChevronDown size={13} style={{ opacity: 0.7, transition: 'transform var(--dur-fast) var(--ease-out)', transform: aptsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {aptsOpen && (
              // El wrapper arranca justo pegado al botón (top: 100%, sin hueco) para que el
              // área "hoverable" sea continua; el padding-top interno es lo que crea el
              // espaciado visual sin abrir un hueco muerto que dispare mouseleave antes de
              // que el cursor llegue al panel.
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                paddingTop: 12,
                zIndex: 100,
              }}>
                <div style={{
                  background: 'rgba(20,17,15,0.97)',
                  border: '1px solid var(--border-on-dark)',
                  borderRadius: 'var(--radius-md)',
                  padding: '6px',
                  minWidth: 210,
                  backdropFilter: 'blur(12px)',
                  boxShadow: 'var(--shadow-lg)',
                }}>
                  {apartamentos.map(apt => (
                    <Link
                      key={apt.slug}
                      href={`/#${apt.slug}`}
                      onClick={(e) => handleAnchorClick(e, `#${apt.slug}`)}
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
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link key={link.label} href={`/${link.href}`} onClick={(e) => handleAnchorClick(e, link.href)} style={navLinkStyle}>
              {link.label}
            </Link>
          ))}

          <Button variant="sand" size="sm" href="/#reserva" onClick={(e) => handleAnchorClick(e, '#reserva')}>Reservar</Button>
        </nav>

        {/* Mobile: CTA + hamburger */}
        <div className="ryn-nav-mobile">
          <Button variant="sand" size="sm" href="/#reserva" onClick={(e) => handleAnchorClick(e, '#reserva')}>Reservar</Button>
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
            Los apartamentos
          </div>
          {apartamentos.map(apt => (
            <Link
              key={apt.slug}
              href={`/#${apt.slug}`}
              onClick={(e) => handleAnchorClick(e, `#${apt.slug}`)}
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
            <Link key={link.label} href={`/${link.href}`} onClick={(e) => handleAnchorClick(e, link.href)} style={{
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
        </div>
      )}
    </header>
  )
}
