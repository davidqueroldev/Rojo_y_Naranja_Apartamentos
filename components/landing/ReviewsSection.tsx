import { Star } from 'lucide-react'
import { SectionHead } from './ApartmentsSection'
import { reviews, info } from '@/lib/data/apartments'

function Stars({ value }: { value: number }) {
  const filled = Math.round((value / 10) * 5)
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} style={{
          color: i < filled ? 'var(--ryn-naranja)' : 'var(--border-strong)',
          fill: i < filled ? 'var(--ryn-naranja)' : 'transparent',
        }} />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section style={{ background: 'var(--surface-sunken)', padding: 'var(--section-y) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)' }}>
        <div className="ryn-reviews-header">
          <SectionHead eyebrow="Opiniones" titulo="Lo que dicen nuestros huéspedes" noMargin />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <Stars value={info.valoracionMedia} />
            <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-xl)', color: 'var(--text-heading)' }}>
              {info.valoracionMedia}/10
            </span>
            <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
              · {info.numOpiniones} opiniones
            </span>
          </div>
        </div>

        <div className="ryn-grid-reviews">
          {reviews.map((r) => (
            <figure key={r.nombre} style={{
              margin: 0,
              background: 'var(--surface-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <Stars value={r.valoracion} />
              <blockquote style={{
                margin: 0,
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-base)',
                lineHeight: 1.55,
                color: 'var(--text-body)',
                fontStyle: 'italic',
              }}>
                &ldquo;{r.texto}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'var(--ryn-plata-soft)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--ryn-plata-dark)',
                  fontFamily: 'var(--font-serif)', fontWeight: 600, flexShrink: 0,
                }}>
                  {r.nombre[0]}
                </span>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-heading)' }}>{r.nombre}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{r.apt}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
