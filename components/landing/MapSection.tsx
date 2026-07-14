'use client'

import dynamic from 'next/dynamic'

// Leaflet requires no SSR (it accesses window)
const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false, loading: () => (
  <div style={{ height: '100%', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Cargando mapa…</span>
  </div>
) })

export function MapSection() {
  return (
    <section id="ubicacion" style={{ background: 'var(--bg-page)', padding: 'var(--section-y) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)' }}>
        <div className="ryn-grid-map">
          <div>
            <div className="ryn-overline" style={{ color: 'var(--accent)' }}>Ubicación</div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 4vw, var(--text-2xl))',
              margin: '12px 0 0', fontWeight: 600,
              color: 'var(--text-heading)', letterSpacing: '-0.01em',
            }}>
              En el corazón de Morella
            </h2>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', lineHeight: 1.6, margin: '14px 0 0', color: 'var(--text-muted)' }}>
              C/ San Nicolás, 11, dentro de la muralla medieval. A un minuto
              de los mejores restaurantes, el castillo y los principales monumentos.
            </p>

            <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Castillo de Morella', dist: '4 min a pie' },
                { label: 'Iglesia de Santa María', dist: '2 min a pie' },
                { label: 'Restaurante El Mesón', dist: '1 min a pie' },
                { label: 'Parking exterior', dist: '3 min a pie' },
              ].map((poi) => (
                <div key={poi.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{poi.label}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{poi.dist}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: 400, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)', isolation: 'isolate' }}>
            <LeafletMap />
          </div>
        </div>
      </div>
    </section>
  )
}
