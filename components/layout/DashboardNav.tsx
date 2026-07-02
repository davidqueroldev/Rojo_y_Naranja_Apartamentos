'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface NavLink {
  href: string
  label: string
  disabled?: boolean
}

const LINKS: Record<'user' | 'owner', NavLink[]> = {
  user: [
    { href: '/user/dashboard', label: 'Panel' },
    { href: '/user/reservas', label: 'Mis reservas' },
    { href: '/user/chat', label: 'Chat', disabled: true },
  ],
  owner: [
    { href: '/owner/dashboard', label: 'Panel' },
    { href: '/owner/reservas', label: 'Reservas' },
    { href: '/owner/precios', label: 'Precios' },
    { href: '/owner/apartamentos', label: 'Disponibilidad' },
    { href: '/owner/chat', label: 'Chat', disabled: true },
  ],
}

export function DashboardNav({ role, nombre }: { role: 'user' | 'owner'; nombre?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function cerrarSesion() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-sm">Rojo y Naranja</Link>
          {LINKS[role].map((link) =>
            link.disabled ? (
              <span key={link.href} className="text-sm text-gray-300 cursor-not-allowed" title="Próximamente">
                {link.label}
              </span>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${pathname?.startsWith(link.href) ? 'font-semibold text-red-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
        <div className="flex items-center gap-4">
          {nombre && <span className="text-sm text-gray-500">{nombre}</span>}
          <button onClick={cerrarSesion} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
            <LogOut size={14} /> Salir
          </button>
        </div>
      </div>
    </nav>
  )
}
