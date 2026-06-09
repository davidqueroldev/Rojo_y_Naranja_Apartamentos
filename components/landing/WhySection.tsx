import { Castle, Sparkles, Waves, BadgePercent } from 'lucide-react'
import { SectionHead } from './ApartmentsSection'
import { ReactNode } from 'react'

const items: { icon: ReactNode; titulo: string; descripcion: string }[] = [
  { icon: <Castle size={24} />, titulo: 'Centro histórico', descripcion: 'Dentro de la ciudad amurallada, a un paso de todo.' },
  { icon: <Sparkles size={24} />, titulo: 'Diseño contemporáneo', descripcion: 'Interiores actuales, cuidados hasta el último detalle.' },
  { icon: <Waves size={24} />, titulo: 'Jacuzzi y spa', descripcion: 'Hidromasaje en todos; jacuzzi en Plata y Oro.' },
  { icon: <BadgePercent size={24} />, titulo: 'Sin comisiones', descripcion: 'Reserva directa con el propietario. Mejor precio.' },
]

export function WhySection() {
  return (
    <section style={{ background: 'var(--ryn-ink)', padding: 'var(--section-y) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)' }}>
        <SectionHead dark eyebrow="Por qué reservar directo" titulo="La diferencia de reservar con nosotros" />
        <div className="ryn-grid-why" style={{ marginTop: 'var(--space-7)' }}>
          {items.map((item) => (
            <div key={item.titulo} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{
                display: 'inline-flex', width: 52, height: 52, borderRadius: '50%',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(213,196,176,0.12)', color: 'var(--ryn-oro)',
              }}>
                {item.icon}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: 'var(--text-lg)', margin: '6px 0 0', fontWeight: 600 }}>
                {item.titulo}
              </h3>
              <p style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-on-dark-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6, margin: 0 }}>
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
