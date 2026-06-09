'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { apartamentos, ApartmentTone, toneColor } from '@/lib/data/apartments'
import { cldUrl } from '@/lib/cloudinary'

type Filter = 'todos' | ApartmentTone

// Take first 3 photos per apartment for the gallery grid
const galleryItems = apartamentos.flatMap((apt) =>
  apt.fotos.slice(0, 3).map((photoId, i) => ({
    slug:    apt.slug,
    tone:    apt.tone,
    nombre:  apt.nombre,
    photoId,
    thumb:   cldUrl(photoId, 'w_600,c_fill,ar_4:3'),
    full:    cldUrl(photoId, 'w_1600'),
    alt:     `${apt.nombre} — foto ${i + 1}`,
  }))
)

const filterLabels: Record<Filter, string> = {
  todos: 'Todos', rojo: 'Rojo', naranja: 'Naranja', plata: 'Plata', oro: 'Oro',
}

export function GallerySection() {
  const [filter, setFilter]         = useState<Filter>('todos')
  const [lightboxIndex, setLightbox] = useState(-1)

  const visible = filter === 'todos'
    ? galleryItems
    : galleryItems.filter((g) => g.tone === filter)

  const slides = visible.map((g) => ({ src: g.full, alt: g.alt }))

  return (
    <section id="galeria" style={{ background: 'var(--ryn-ink)', padding: 'var(--section-y) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)' }}>

        {/* Header + filters */}
        <div className="ryn-gallery-header">
          <div>
            <div className="ryn-overline" style={{ color: 'var(--ryn-plata)' }}>Galería</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', margin: '12px 0 0', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
              Espacios que enamoran
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(['todos', 'rojo', 'naranja', 'plata', 'oro'] as const).map((f) => {
              const active = filter === f
              const color  = f === 'todos' ? 'var(--ryn-oro)' : toneColor[f as ApartmentTone]
              return (
                <button key={f} onClick={() => setFilter(f)} style={{
                  fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 'var(--text-xs)',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '6px 14px', borderRadius: 'var(--radius-pill)',
                  border: `1px solid ${active ? color : 'var(--border-on-dark)'}`,
                  background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
                  color: active ? color : 'var(--text-on-dark-muted)',
                  cursor: 'pointer', transition: 'all var(--dur-fast) var(--ease-out)',
                }}>
                  {filterLabels[f]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Photo grid */}
        <div className="ryn-gallery-grid">
          {visible.map((item, i) => (
            <button
              key={`${item.slug}-${item.photoId}`}
              onClick={() => setLightbox(i)}
              style={{
                position: 'relative', aspectRatio: '4 / 3', border: 'none',
                padding: 0, cursor: 'pointer', borderRadius: 'var(--radius-md)',
                overflow: 'hidden', background: 'var(--ryn-ink-2)',
              }}
              aria-label={item.alt}
            >
              <Image
                src={item.thumb}
                alt={item.alt}
                fill
                style={{ objectFit: 'cover', transition: 'transform var(--dur-slow) var(--ease-out)' }}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: toneColor[item.tone] }} />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightbox(-1)}
        index={lightboxIndex}
        slides={slides}
        styles={{ container: { backgroundColor: 'rgba(20,17,15,0.97)' } }}
      />
    </section>
  )
}
