# M11 — SEO TÉCNICO & METADATOS
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S4/S5 · Estado: ⬜ Pendiente

---

## 🎯 Objetivo
Posicionar la web en búsquedas como "apartamentos Morella", "alojamiento rural Morella", "apartamento jacuzzi Morella".

## 🔍 Keywords objetivo

- Primarias: apartamentos Morella · alojamiento Morella · casa rural Morella
- Long tail: apartamento jacuzzi Morella · apartamento romántico Morella · alojamiento centro histórico Morella

## 🏷️ Metadatos por página

```typescript
// app/(public)/page.tsx — Landing
export const metadata: Metadata = {
  title: 'Apartamentos Rojo y Naranja — Diseño y confort en Morella',
  description: '4 apartamentos boutique en el corazón de Morella. Jacuzzi, terraza privada, diseño moderno. Reserva directa sin comisiones.',
  keywords: ['apartamentos Morella', 'alojamiento Morella', 'jacuzzi Morella'],
  openGraph: {
    title: 'Apartamentos Rojo y Naranja · Morella',
    description: '4 apartamentos de diseño en el centro histórico de Morella',
    images: [{ url: '/og-morella.jpg', width: 1200, height: 630 }],
    locale: 'es_ES', type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

// app/(public)/apartamentos/[slug]/page.tsx — Detalle
export async function generateMetadata({ params }) {
  const apt = await getApartamento(params.slug)
  return {
    title: `${apt.nombre} — Apartamentos Rojo y Naranja · Morella`,
    description: apt.descripcion,
    openGraph: { images: [apt.fotos[0]] }
  }
}
```

## 📋 Schema.org (JSON-LD)

```tsx
// components/landing/SchemaOrg.tsx
const schema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Apartamentos Rojo y Naranja",
  "description": "4 apartamentos boutique en el centro histórico de Morella",
  "url": "https://apartamentosrojoynaranja.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "C/ San Nicolás, 11",
    "addressLocality": "Morella",
    "addressRegion": "Castellón",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.618071,
    "longitude": -0.100218
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "10",
    "reviewCount": "10"
  },
  "touristType": "Couples, Adults"
}
```

## ✅ Checklist del módulo

- [ ] `metadata` en todas las páginas públicas
- [ ] JSON-LD `LodgingBusiness` en landing
- [ ] JSON-LD `Apartment` en cada página de apartamento
- [ ] `app/sitemap.ts` generado dinámicamente (incluye slugs de apartamentos)
- [ ] `app/robots.ts` configurado
- [ ] Imágenes con `next/image`, `alt` descriptivos, formatos WebP
- [ ] URLs canónicas en cada página
- [ ] Validar con Google Rich Results Test
- [ ] Google Search Console: enviar sitemap

---

*Módulo M11 · Depende de: M4 · Ver 00_ROADMAP_GENERAL.md*
