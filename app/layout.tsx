import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Apartamentos Rojo y Naranja — Morella',
    template: '%s | Apartamentos Rojo y Naranja',
  },
  description: 'Alojamientos con encanto en el corazón de Morella, Castellón.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
