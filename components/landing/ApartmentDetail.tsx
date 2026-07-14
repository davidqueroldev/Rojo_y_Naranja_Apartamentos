'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import {
  Wifi, Tv, Bath, ShowerHead, Waves, Flame, BedDouble, Coffee,
  Sun, CookingPot, Wind, UtensilsCrossed, Users,
} from 'lucide-react'
import { Apartment, apartamentos, toneColor } from '@/lib/data/apartments'
import { ApartmentCard } from '@/components/ui/ApartmentCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cldUrl } from '@/lib/cloudinary'

const amenityIcon: Record<string, React.ReactNode> = {
  'Wifi':           <Wifi size={18} />,
  'TV':             <Tv size={18} />,
  '2 baños':        <Bath size={18} />,
  'Bañera':         <Bath size={18} />,
  'Hidromasaje':    <ShowerHead size={18} />,
  'Jacuzzi 2 pax':  <Waves size={18} />,
  'Jacuzzi':        <Waves size={18} />,
  'Cromoterapia':   <Waves size={18} />,
  'Chimenea':       <Flame size={18} />,
  'Cama 160×200':   <BedDouble size={18} />,
  'Nespresso':      <Coffee size={18} />,
  'Terraza 16 m²':  <Sun size={18} />,
  'Ducha cascada':  <ShowerHead size={18} />,
  'Vistas':         <Sun size={18} />,
  'Cocina completa':<CookingPot size={18} />,
  'Lavavajillas':   <UtensilsCrossed size={18} />,
  'Lavadora':       <Wind size={18} />,
  'Secadora':       <Wind size={18} />,
}

export function ApartmentDetail({ apartment: apt }: { apartment: Apartment }) {
  const seam = toneColor[apt.tone]
  const others = apartamentos.filter((a) => a.slug !== apt.slug)
  const [lightboxIndex, setLightbox] = useState(-1)
  const slides = apt.fotos.map((photoId, i) => ({
    src: cldUrl(photoId, 'w_1600'),
    alt: `${apt.nombre} — foto ${i + 1}`,
  }))

  return (
    <main>
      {/* Photo gallery */}
      <div style={{ background: 'var(--ryn-ink)' }}>
        <div className="ryn-detail-photos" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          {/* Main photo */}
          <div style={{ position: 'relative', height: '100%' }}>
            <Image
              src={cldUrl(apt.fotos[0], 'w_1200,c_fill')}
              alt={`${apt.nombre} — foto principal`}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: seam }} />
          </div>
          {/* Side thumbnails */}
          <div className="ryn-detail-photo-side">
            {[apt.fotos[1], apt.fotos[2]].map((pid, i) => pid ? (
              <div key={pid} style={{ flex: 1, position: 'relative' }}>
                <Image
                  src={cldUrl(pid, 'w_600,c_fill')}
                  alt={`${apt.nombre} — foto ${i + 2}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="33vw"
                />
              </div>
            ) : (
              <div key={i} style={{ flex: 1, background: `linear-gradient(135deg, ${apt.gradFrom}, ${apt.gradTo})` }} />
            ))}
          </div>
        </div>

        {/* Full gallery grid */}
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-6) var(--container-pad)' }}>
          <div className="ryn-overline" style={{ color: 'var(--ryn-plata)', marginBottom: 'var(--space-4)' }}>Galería</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 8,
          }}>
            {apt.fotos.map((photoId, i) => (
              <button
                key={photoId}
                onClick={() => setLightbox(i)}
                style={{
                  position: 'relative', aspectRatio: '4 / 3', border: 'none',
                  padding: 0, cursor: 'pointer', borderRadius: 'var(--radius-md)',
                  overflow: 'hidden', background: 'var(--ryn-ink-2)',
                }}
                aria-label={`${apt.nombre} — foto ${i + 1}`}
              >
                <Image
                  src={cldUrl(photoId, 'w_600,c_fill,ar_4:3')}
                  alt={`${apt.nombre} — foto ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightbox(-1)}
        index={lightboxIndex}
        slides={slides}
        styles={{ container: { backgroundColor: 'rgba(20,17,15,0.97)' } }}
      />

      {/* Main content */}
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-8) var(--container-pad)' }}>
        <div className="ryn-detail-layout">

          {/* Left: info */}
          <div className="ryn-detail-info">
            {/* Header badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 'var(--space-5)' }}>
              <div style={{ height: 4, width: 40, background: seam, borderRadius: 2 }} />
              {!apt.aceptaNinos && <Badge tone="rojo" variant="soft">Solo adultos</Badge>}
              <Badge tone="neutral" variant="outline">
                <Users size={12} style={{ display: 'inline' }} /> {apt.capacidadMax} personas
              </Badge>
              <Badge tone="neutral" variant="outline">{apt.habitaciones} dormitorio{apt.habitaciones > 1 ? 's' : ''}</Badge>
              <Badge tone="neutral" variant="outline">{apt.banos} baño{apt.banos > 1 ? 's' : ''}</Badge>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, var(--text-3xl))', margin: '0 0 var(--space-4)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {apt.nombre}
            </h1>

            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-md)', lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 var(--space-7)' }}>
              {apt.resumen}
            </p>

            {/* Amenities */}
            <div style={{ marginBottom: 'var(--space-7)' }}>
              <div className="ryn-overline" style={{ color: 'var(--accent)', marginBottom: 'var(--space-4)' }}>Equipamiento</div>
              <div className="ryn-detail-amenities">
                {apt.amenities.map((am) => (
                  <div key={am} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>{amenityIcon[am] ?? <Wifi size={18} />}</span>
                    {am}
                  </div>
                ))}
              </div>
            </div>

            {/* Adults-only notice */}
            {!apt.aceptaNinos && (
              <div style={{
                background: 'var(--ryn-rojo-soft)',
                borderLeft: '3px solid var(--ryn-rojo)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)', marginBottom: 'var(--space-7)',
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}>
                <Users size={18} style={{ color: 'var(--ryn-rojo)', flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ryn-rojo-dark)' }}>
                    Solo adultos
                  </div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--ryn-rojo-dark)', lineHeight: 1.55, marginTop: 2 }}>
                    Este apartamento está concebido como una escapada íntima para adultos. No se admiten menores de 18 años.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: reserva CTA */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{
              background: 'var(--surface-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-md)',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 'var(--space-4)' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'var(--text-heading)' }}>
                  {apt.precio}€
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>/noche</span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-heading)', margin: '0 0 var(--space-3)' }}>
                ¿Te interesa este apartamento?
              </h3>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-muted)', margin: '0 0 var(--space-5)' }}>
                Cuéntanos tus fechas y necesidades: te confirmamos disponibilidad y precio sin compromiso.
              </p>

              <Button variant="primary" size="lg" fullWidth href={`/?apartamento=${apt.slug}#reserva`}>
                Solicitar esta reserva
              </Button>

              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textAlign: 'center', margin: 'var(--space-3) 0 0', lineHeight: 1.5 }}>
                Reserva directa · Sin comisiones · Mejor precio garantizado
              </p>
            </div>
          </div>
        </div>

        {/* Other apartments */}
        <div style={{ marginTop: 'var(--space-10)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-8)' }}>
          <div className="ryn-overline" style={{ color: 'var(--accent)', marginBottom: 'var(--space-3)' }}>Otros apartamentos</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', margin: '0 0 var(--space-7)', fontWeight: 600, color: 'var(--text-heading)', letterSpacing: '-0.01em' }}>
            Descubre el resto de la colección
          </h2>
          <div className="ryn-grid-others">
            {others.map((a) => (
              <ApartmentCard
                key={a.slug}
                tone={a.tone}
                nombre={a.nombre}
                capacidad={`${a.capacidadMax} pers.`}
                soloAdultos={!a.aceptaNinos}
                amenities={a.amenities.slice(0, 3)}
                precioDesde={a.precio}
                ctaHref={`/apartamentos/${a.slug}`}
                media={
                <Image
                  src={cldUrl(a.fotos[0], 'w_600,c_fill,ar_4:3')}
                  alt={a.nombre}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              }
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
