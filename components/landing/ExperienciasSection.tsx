import Image from 'next/image'
import { Castle, UtensilsCrossed, Footprints, Telescope } from 'lucide-react'
import { SectionHead } from './ApartmentsSection'
import { ReactNode } from 'react'
import { cldUrl } from '@/lib/cloudinary'
import { morellaPhoots } from '@/lib/data/apartments'

const experiencias: { icon: ReactNode; titulo: string; texto: string }[] = [
  { icon: <Castle size={22} />, titulo: 'Castillo y murallas', texto: 'A pocos minutos a pie del recinto amurallado medieval.' },
  { icon: <UtensilsCrossed size={22} />, titulo: 'Gastronomía', texto: 'Restaurantes de cocina morellana a un minuto de la puerta.' },
  { icon: <Footprints size={22} />, titulo: 'Senderismo', texto: 'Rutas por Els Ports, observación de fauna y flora.' },
  { icon: <Telescope size={22} />, titulo: 'Astroturismo', texto: 'Observatorio astronómico y cielos limpios del Maestrazgo.' },
]

export function ExperienciasSection() {
  return (
    <section style={{ background: 'var(--bg-page)', padding: 'var(--section-y) 0' }}>
      <div className="ryn-grid-exp" style={{
        maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)',
      }}>
        <div>
          <SectionHead
            eyebrow="Morella te espera"
            titulo="Una villa medieval entre murallas"
            texto="A los pies del castillo, Morella conserva calles empedradas, gastronomía con denominación propia y cielos perfectos para mirar las estrellas."
          />
          <div className="ryn-grid-exp-items" style={{ marginTop: 'var(--space-6)' }}>
            {experiencias.map((e) => (
              <div key={e.titulo} style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>{e.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--text-heading)', fontSize: 'var(--text-base)' }}>{e.titulo}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.55 }}>{e.texto}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ryn-exp-photo" style={{ position: 'relative', height: 420, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
          <Image
            src={cldUrl(morellaPhoots[0], 'w_900,c_fill,ar_3:4')}
            alt="Morella, ciudad amurallada"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1024px) 0px, 40vw"
          />
        </div>
      </div>
    </section>
  )
}
