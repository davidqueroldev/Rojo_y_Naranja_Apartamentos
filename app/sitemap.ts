import type { MetadataRoute } from 'next'
import { apartamentos } from '@/lib/data/apartments'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasApartamentos: MetadataRoute.Sitemap = apartamentos.map((apt) => ({
    url: `${APP_URL}/apartamentos/${apt.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: APP_URL, changeFrequency: 'weekly', priority: 1 },
    ...paginasApartamentos,
    { url: `${APP_URL}/login`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
