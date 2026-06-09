'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Search } from 'lucide-react'
import { cldHero } from '@/lib/cloudinary'

// Ático Oro — main photo as landing hero
const HERO_PHOTO = '53089ab83c023_v5rjfc'

export function Hero() {
  const [apt, setApt] = useState('')

  return (
    <section style={{ position: 'relative', minHeight: 640, display: 'flex', alignItems: 'center' }}>
      {/* Real photo background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={cldHero(HERO_PHOTO)}
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          sizes="100vw"
        />
      </div>
      {/* Left-weighted scrim */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-hero)' }} />

      <div style={{
        position: 'relative',
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '0 var(--container-pad)',
        width: '100%',
      }}>
        <div style={{ maxWidth: 640, paddingTop: 48, paddingBottom: 56 }}>
          <div className="ryn-overline" style={{ color: 'var(--ryn-plata)', marginBottom: 0 }}>· Morella ·</div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            color: '#fff',
            fontSize: 'clamp(2.25rem, 5vw, var(--text-4xl))',
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            margin: '16px 0 0',
            fontWeight: 600,
          }}>
            Apartamentos exclusivos en el centro de Morella
          </h1>

          <hr className="ryn-rule" style={{ background: 'var(--ryn-naranja)', margin: '22px 0' }} />

          <p style={{
            fontFamily: 'var(--font-ui)',
            color: 'var(--text-on-dark)',
            fontSize: 'var(--text-md)',
            lineHeight: 1.6,
            maxWidth: 520,
            margin: 0,
          }}>
            Cuatro apartamentos de diseño en el corazón de la ciudad medieval amurallada.
            A un minuto de los restaurantes, el castillo y la historia viva de Morella.
          </p>

          {/* Inline search */}
          <div style={{
            marginTop: 34,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            alignItems: 'flex-end',
            background: 'rgba(251,246,238,0.10)',
            border: '1px solid rgba(251,246,238,0.22)',
            borderRadius: 'var(--radius-lg)',
            padding: 14,
            backdropFilter: 'blur(6px)',
          }}>
            <SearchField label="Apartamento">
              <select
                value={apt}
                onChange={(e) => setApt(e.target.value)}
                className="ryn-hero-select"
              >
                <option value="">Cualquiera</option>
                <option value="rojo">Apartamento Rojo</option>
                <option value="naranja">Apartamento Naranja</option>
                <option value="plata">Apartamento Plata</option>
                <option value="oro">Ático Oro</option>
              </select>
            </SearchField>

            <SearchField label="Entrada">
              <input type="date" className="ryn-hero-select" />
            </SearchField>

            <SearchField label="Salida">
              <input type="date" className="ryn-hero-select" />
            </SearchField>

            <SearchField label="Personas">
              <select className="ryn-hero-select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </SearchField>

            <Button variant="sand" size="md" iconLeft={<Search size={18} />} href="#apartamentos">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SearchField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: '1 1 130px', minWidth: 120 }}>
      <span style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--ryn-oro)',
      }}>
        {label}
      </span>
      {children}
    </label>
  )
}
