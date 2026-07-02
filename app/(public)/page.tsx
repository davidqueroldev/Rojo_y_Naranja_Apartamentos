import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { ApartmentsSection } from '@/components/landing/ApartmentsSection'
import { WhySection } from '@/components/landing/WhySection'
import { ExperienciasSection } from '@/components/landing/ExperienciasSection'
import { GallerySection } from '@/components/landing/GallerySection'
import { ReviewsSection } from '@/components/landing/ReviewsSection'
import { MapSection } from '@/components/landing/MapSection'
import { CtaBanner } from '@/components/landing/CtaBanner'
import { Footer } from '@/components/landing/Footer'
import { MobileCta } from '@/components/landing/MobileCta'
import { SchemaOrg } from '@/components/landing/SchemaOrg'
import { cldUrl } from '@/lib/cloudinary'

const HERO_PHOTO = '53089ab83c023_v5rjfc'

export const metadata: Metadata = {
  description: '4 apartamentos boutique en el corazón de Morella. Jacuzzi, terraza privada, diseño moderno. Reserva directa sin comisiones.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Apartamentos Rojo y Naranja · Morella',
    description: '4 apartamentos de diseño en el centro histórico de Morella',
    images: [{ url: cldUrl(HERO_PHOTO, 'w_1200,h_630,c_fill'), width: 1200, height: 630 }],
    url: '/',
  },
}

export default function LandingPage() {
  return (
    <>
      <SchemaOrg />
      <Navbar />
      <main>
        <Hero />
        <ApartmentsSection />
        <WhySection />
        <ExperienciasSection />
        <GallerySection />
        <ReviewsSection />
        <MapSection />
        <CtaBanner />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}
