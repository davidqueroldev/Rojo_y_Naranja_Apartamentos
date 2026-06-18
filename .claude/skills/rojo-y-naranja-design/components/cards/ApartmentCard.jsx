import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { Button } from '../core/Button.jsx';

/**
 * ApartmentCard — the signature listing card for the four apartments.
 * Photo on top (pass any node — an <img>, an <image-slot>, or a colour block),
 * then identity-coloured name, capacity, optional "solo adultos" flag,
 * a short amenities line and the "desde X€/noche" price with a CTA.
 */
export function ApartmentCard({
  tone = 'rojo',
  nombre,
  media = null,
  capacidad,
  soloAdultos = false,
  amenities = [],
  precioDesde,
  ctaLabel = 'Ver detalles',
  onCta,
  ...rest
}) {
  const toneVar = {
    rojo: 'var(--ryn-rojo)', naranja: 'var(--ryn-naranja)',
    plata: 'var(--ryn-plata)', oro: 'var(--ryn-oro-dark)',
  }[tone] || 'var(--ryn-rojo)';

  return (
    <article
      className="ryn-aptcard"
      style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--border)',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      }}
      {...rest}
    >
      <div style={{ position: 'relative', aspectRatio: '4 / 3', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
        {media}
        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}>
          {soloAdultos && <Badge tone="rojo" variant="solid" size="sm">Solo adultos</Badge>}
        </div>
        {/* identity colour seam */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: toneVar }} />
      </div>

      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', color: 'var(--text-heading)', margin: 0, fontWeight: 'var(--fw-semibold)', flex: '1 1 auto', minWidth: 0 }}>
            {nombre}
          </h3>
          {capacidad && <span style={{ flex: 'none' }}><Badge tone="neutral" variant="outline" size="sm">{capacidad}</Badge></span>}
        </div>

        {amenities.length > 0 && (
          <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {amenities.join(' · ')}
          </p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>Desde</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', color: 'var(--text-heading)', fontWeight: 'var(--fw-semibold)' }}>
              {precioDesde}€<span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-regular)', color: 'var(--text-muted)' }}> /noche</span>
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={onCta}>{ctaLabel}</Button>
        </div>
      </div>
    </article>
  );
}
