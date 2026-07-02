import type { Apartment } from '@/lib/data/apartments'
import { cldUrl } from '@/lib/cloudinary'

export function ApartmentSchema({ apt }: { apt: Apartment }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: apt.nombre,
    description: apt.resumen,
    numberOfRooms: apt.habitaciones,
    numberOfBathroomsTotal: apt.banos,
    occupancy: { '@type': 'QuantitativeValue', maxValue: apt.capacidadMax },
    amenityFeature: apt.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a })),
    image: apt.fotos.slice(0, 5).map((f) => cldUrl(f, 'w_1200,h_800,c_fill')),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C/ San Nicolás, 11',
      addressLocality: 'Morella',
      addressRegion: 'Castellón',
      addressCountry: 'ES',
    },
    offers: {
      '@type': 'Offer',
      price: apt.precio,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
