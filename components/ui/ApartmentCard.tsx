import { ReactNode } from 'react'
import { Badge } from './Badge'
import { Button } from './Button'
import { ApartmentTone, toneColor } from '@/lib/data/apartments'

interface ApartmentCardProps {
  tone?: ApartmentTone
  nombre: string
  media?: ReactNode
  capacidad: string
  soloAdultos?: boolean
  amenities?: string[]
  precioDesde: number
  ctaLabel?: string
  ctaHref?: string
  onCta?: () => void
}

export function ApartmentCard({
  tone = 'rojo',
  nombre,
  media,
  capacidad,
  soloAdultos = false,
  amenities = [],
  precioDesde,
  ctaLabel = 'Ver detalles',
  ctaHref,
  onCta,
}: ApartmentCardProps) {
  const seam = toneColor[tone]

  return (
    <article className="ryn-aptcard" style={{
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
      border: '1px solid var(--border)',
    }}>
      <div style={{ position: 'relative', aspectRatio: '4 / 3', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
        {media}
        {soloAdultos && (
          <div style={{ position: 'absolute', top: 14, left: 14 }}>
            <Badge tone="rojo" variant="solid" size="sm">Solo adultos</Badge>
          </div>
        )}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: seam }} />
      </div>

      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', color: 'var(--text-heading)', margin: 0, fontWeight: 600, flex: '1 1 auto', minWidth: 0 }}>
            {nombre}
          </h3>
          <span style={{ flex: 'none' }}>
            <Badge tone="neutral" variant="outline" size="sm">{capacidad}</Badge>
          </span>
        </div>

        {amenities.length > 0 && (
          <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {amenities.join(' · ')}
          </p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
              Desde
            </span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', color: 'var(--text-heading)', fontWeight: 600 }}>
              {precioDesde}€
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', fontWeight: 400, color: 'var(--text-muted)' }}> /noche</span>
            </span>
          </div>
          <Button variant="outline" size="sm" href={ctaHref} onClick={onCta}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  )
}
