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

export default function LandingPage() {
  return (
    <>
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
