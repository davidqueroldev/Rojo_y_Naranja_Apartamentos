import type { Metadata } from 'next'
import { Lora, Montserrat } from 'next/font/google'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Apartamentos Rojo y Naranja — Morella',
    template: '%s | Apartamentos Rojo y Naranja',
  },
  description: 'Cuatro apartamentos boutique en el corazón de la ciudad medieval amurallada de Morella. Reserva directa, sin comisiones.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${lora.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
