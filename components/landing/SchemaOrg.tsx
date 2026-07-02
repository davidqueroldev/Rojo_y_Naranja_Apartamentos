import { apartamentos, info } from '@/lib/data/apartments'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Apartamentos Rojo y Naranja',
    description: 'Cuatro apartamentos boutique en el centro histórico amurallado de Morella, Castellón.',
    url: APP_URL,
    telephone: info.telefono,
    email: info.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C/ San Nicolás, 11',
      addressLocality: 'Morella',
      addressRegion: 'Castellón',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.618071,
      longitude: -0.100218,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: info.valoracionMedia,
      reviewCount: info.numOpiniones,
    },
    touristType: 'Couples, Families, Adults',
    numberOfRooms: apartamentos.length,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
