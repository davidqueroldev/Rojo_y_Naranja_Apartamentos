import Image from 'next/image'
import { ApartmentCard } from '@/components/ui/ApartmentCard'
import { apartamentos } from '@/lib/data/apartments'
import { cldUrl } from '@/lib/cloudinary'

export function ApartmentsSection() {
  return (
    <section id="apartamentos" style={{ background: 'var(--bg-page)', padding: 'var(--section-y) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)' }}>
        <SectionHead
          eyebrow="Los apartamentos"
          titulo="Cuatro estancias, cuatro caracteres"
          texto="Cada apartamento lleva el nombre de un color de nuestra identidad. Todos de diseño moderno, en pleno casco histórico."
        />
        <div className="ryn-grid-apts" style={{ marginTop: 'var(--space-7)' }}>
          {apartamentos.map((apt) => (
            <ApartmentCard
              key={apt.slug}
              tone={apt.tone}
              nombre={apt.nombre}
              capacidad={`${apt.capacidadMax} pers.`}
              soloAdultos={!apt.aceptaNinos}
              amenities={apt.amenities.slice(0, 3)}
              precioDesde={apt.precio}
              ctaHref={`/apartamentos/${apt.slug}`}
              media={
                <Image
                  src={cldUrl(apt.fotos[0], 'w_800,c_fill,ar_4:3')}
                  alt={apt.nombre}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
              }
            />
          ))}
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
