import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { ApartmentDetail } from '@/components/landing/ApartmentDetail'
import { ApartmentSchema } from '@/components/landing/ApartmentSchema'
import { apartamentos } from '@/lib/data/apartments'
import { cldUrl } from '@/lib/cloudinary'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return apartamentos.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const apt = apartamentos.find((a) => a.slug === params.slug)
  if (!apt) return {}
  return {
    title: `${apt.nombre} · Morella`,
    description: apt.resumen,
    keywords: [`${apt.nombre} Morella`, 'apartamento Morella', ...apt.amenities.map((a) => `${a} Morella`)],
    alternates: { canonical: `/apartamentos/${apt.slug}` },
    openGraph: {
      title: `${apt.nombre} — Apartamentos Rojo y Naranja`,
      description: apt.resumen,
      images: [{ url: cldUrl(apt.fotos[0], 'w_1200,h_630,c_fill'), width: 1200, height: 630 }],
      url: `/apartamentos/${apt.slug}`,
    },
  }
}

export default function ApartamentoPage({ params }: Props) {
  const apt = apartamentos.find((a) => a.slug === params.slug)
  if (!apt) notFound()

  return (
    <>
      <ApartmentSchema apt={apt} />
      <Navbar />
      <ApartmentDetail apartment={apt} />
      <Footer />
    </>
  )
}
