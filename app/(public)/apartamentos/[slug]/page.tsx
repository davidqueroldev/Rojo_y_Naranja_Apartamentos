import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { ApartmentDetail } from '@/components/landing/ApartmentDetail'
import { apartamentos } from '@/lib/data/apartments'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return apartamentos.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const apt = apartamentos.find((a) => a.slug === params.slug)
  if (!apt) return {}
  return {
    title: `${apt.nombre} — Apartamentos Rojo y Naranja · Morella`,
    description: apt.resumen,
  }
}

export default function ApartamentoPage({ params }: Props) {
  const apt = apartamentos.find((a) => a.slug === params.slug)
  if (!apt) notFound()

  return (
    <>
      <Navbar />
      <ApartmentDetail apartment={apt} />
      <Footer />
    </>
  )
}
