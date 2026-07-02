import type { Metadata } from 'next'
import { Lora, Montserrat } from 'next/font/google'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Apartamentos Rojo y Naranja — Diseño y confort en Morella',
    template: '%s | Apartamentos Rojo y Naranja',
  },
  description: 'Cuatro apartamentos boutique en el corazón de la ciudad medieval amurallada de Morella. Reserva directa, sin comisiones.',
  keywords: ['apartamentos Morella', 'alojamiento Morella', 'casa rural Morella', 'apartamento jacuzzi Morella', 'apartamento romántico Morella', 'alojamiento centro histórico Morella'],
  openGraph: {
    siteName: 'Apartamentos Rojo y Naranja',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${lora.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
