import type { CSSProperties } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { apartamentos, toneColor, type Apartment } from '@/lib/data/apartments'
import { cldUrl } from '@/lib/cloudinary'

export function ApartmentsSection() {
  return (
    <div id="apartamentos">
      {apartamentos.map((apt, i) => (
        <ApartmentFeedItem key={apt.slug} apt={apt} index={i} />
      ))}
    </div>
  )
}

function ApartmentFeedItem({ apt, index }: { apt: Apartment; index: number }) {
  const reverse = index % 2 !== 0
  const accent = toneColor[apt.tone]
  const bg = index % 2 === 0 ? 'var(--surface-card)' : 'var(--bg-page)'

  return (
    <section
      id={apt.slug}
      style={{ background: bg, padding: 'var(--section-y) 0' }}
    >
      <div
        className="ryn-feed-row"
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 var(--container-pad)',
          '--feed-dir': reverse ? 'row-reverse' : 'row',
        } as CSSProperties}
      >
        {/* Photo */}
        <div className="ryn-feed-photo">
          <Image
            src={cldUrl(apt.fotos[0], 'w_1000,c_fill,ar_4:3')}
            alt={apt.nombre}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 54vw"
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: accent }} />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="ryn-overline" style={{ color: accent }}>
            {apt.eyebrow}
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 3.5vw, var(--text-2xl))',
            margin: '10px 0 0',
            fontWeight: 600,
            color: 'var(--text-heading)',
            letterSpacing: '-0.01em',
          }}>
            {apt.nombre}
          </h2>

          <div style={{ width: 48, height: 3, background: accent, margin: '18px 0' }} />

          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--text-md)',
            lineHeight: 1.65,
            color: 'var(--text-muted)',
            margin: 0,
          }}>
            {apt.resumen}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'var(--space-5)' }}>
            {apt.amenities.map(a => (
              <Badge key={a} tone="neutral" variant="outline" size="sm">{a}</Badge>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 'var(--space-4)', alignItems: 'center' }}>
            <Badge tone="neutral" variant="solid" size="sm">
              {apt.capacidadMax} personas · {apt.habitaciones} hab.
            </Badge>
            {!apt.aceptaNinos && (
              <Badge tone="rojo" variant="soft" size="sm">Solo adultos</Badge>
            )}
          </div>

          <div style={{ marginTop: 'var(--space-6)' }}>
            <Button variant="primary" size="md" href={`/apartamentos/${apt.slug}`}>
              Ver detalles y reservar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionHead({
  eyebrow,
  titulo,
  texto,
  dark = false,
  noMargin = false,
}: {
  eyebrow: string
  titulo: string
  texto?: string
  dark?: boolean
  noMargin?: boolean
}) {
  return (
    <div style={{ maxWidth: 620, marginBottom: noMargin ? 0 : undefined }}>
      <div className="ryn-overline" style={{ color: dark ? 'var(--ryn-plata)' : 'var(--accent)' }}>
        {eyebrow}
      </div>
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(1.75rem, 4vw, var(--text-2xl))',
        margin: '12px 0 0',
        fontWeight: 600,
        color: dark ? '#fff' : 'var(--text-heading)',
        letterSpacing: '-0.01em',
      }}>
        {titulo}
      </h2>
      {texto && (
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--text-md)',
          lineHeight: 1.6,
          margin: '14px 0 0',
          color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
        }}>
          {texto}
        </p>
      )}
    </div>
  )
}
