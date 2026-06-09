import { MapPin, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { info } from '@/lib/data/apartments'
import { ReactNode } from 'react'

export function Footer() {
  return (
    <footer id="contacto" style={{ background: 'var(--ryn-ink)', color: 'var(--text-on-dark-muted)', padding: 'var(--space-8) 0 var(--space-6)' }}>
      <div className="ryn-grid-footer">
        {/* Brand */}
        <div>
          <Image src="/logo-white.png" alt="Rojo y Naranja" width={140} height={42} style={{ height: 40, width: 'auto' }} />
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginTop: 14, maxWidth: 280 }}>
            Cuatro apartamentos boutique en el centro amurallado de Morella.
            Reserva directa, sin comisiones.
          </p>
        </div>

        {/* Contact */}
        <div>
          <FooterHead>Contacto</FooterHead>
          <FooterLine icon={<MapPin size={15} />}>{info.direccion}</FooterLine>
          <FooterLine icon={<Phone size={15} />}>
            <a href={`tel:${info.telefono.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{info.telefono}</a>
          </FooterLine>
          <FooterLine icon={<Mail size={15} />}>
            <a href={`mailto:${info.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{info.email}</a>
          </FooterLine>
        </div>

        {/* Registry */}
        <div>
          <FooterHead>Registro de turismo</FooterHead>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', lineHeight: 2 }}>
            {info.registros.split(' · ').map((r) => (
              <div key={r}>{r}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 18, color: 'var(--ryn-plata)' }}>
            <a href="https://www.instagram.com/rojoynaranja" aria-label="Instagram" style={{ color: 'inherit', display: 'inline-flex' }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="https://www.facebook.com/rojoynaranja" aria-label="Facebook" style={{ color: 'inherit', display: 'inline-flex' }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: 'var(--container-max)', margin: '24px auto 0',
        padding: '18px var(--container-pad) 0',
        borderTop: '1px solid var(--border-on-dark)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
        fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)',
      }}>
        <span>© 2026 Apartamentos Rojo y Naranja · Morella</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link href="/aviso-legal" style={{ color: 'inherit', textDecoration: 'none' }}>Aviso legal</Link>
          <Link href="/privacidad" style={{ color: 'inherit', textDecoration: 'none' }}>Privacidad</Link>
          <Link href="/cookies" style={{ color: 'inherit', textDecoration: 'none' }}>Cookies</Link>
        </div>
      </div>
    </footer>
  )
}

function FooterHead({ children }: { children: ReactNode }) {
  return <div className="ryn-overline" style={{ color: 'var(--ryn-oro)', marginBottom: 14 }}>{children}</div>
}

function FooterLine({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>
      <span style={{ color: 'var(--ryn-plata)', flexShrink: 0, marginTop: 1 }}>{icon}</span>
      {children}
    </div>
  )
}
