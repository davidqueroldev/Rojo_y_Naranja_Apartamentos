import Image from 'next/image'
import { cldHero } from '@/lib/cloudinary'

const HERO_PHOTO = '53089ab83c023_v5rjfc'

export function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: 640, display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={cldHero(HERO_PHOTO)}
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          sizes="100vw"
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-hero)' }} />

      <div style={{
        position: 'relative',
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '0 var(--container-pad)',
        width: '100%',
      }}>
        <div style={{ maxWidth: 640, paddingTop: 48, paddingBottom: 72 }}>
          <div className="ryn-overline" style={{ color: 'var(--ryn-plata)', marginBottom: 0 }}>· Morella ·</div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            color: '#fff',
            fontSize: 'clamp(2.25rem, 5vw, var(--text-4xl))',
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            margin: '16px 0 0',
            fontWeight: 600,
          }}>
            Apartamentos exclusivos en el centro de Morella
          </h1>

          <hr className="ryn-rule" style={{ background: 'var(--ryn-naranja)', margin: '22px 0' }} />

          <p style={{
            fontFamily: 'var(--font-ui)',
            color: 'var(--text-on-dark)',
            fontSize: 'var(--text-md)',
            lineHeight: 1.6,
            maxWidth: 520,
            margin: 0,
          }}>
            Cuatro apartamentos de diseño en el corazón de la ciudad medieval amurallada.
            A un minuto de los restaurantes, el castillo y la historia viva de Morella.
          </p>
        </div>
      </div>
    </section>
  )
}
