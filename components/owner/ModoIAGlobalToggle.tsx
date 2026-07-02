'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ModoIAGlobalToggle() {
  const router = useRouter()
  const [cargando, setCargando] = useState(false)

  async function aplicar(valor: boolean) {
    setCargando(true)
    try {
      await fetch('/api/owner/conversaciones/modo-ia-global', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modo_ia: valor }),
      })
      router.refresh()
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500">IA para todas:</span>
      <button onClick={() => aplicar(true)} disabled={cargando} className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs disabled:opacity-50">
        Activar
      </button>
      <button onClick={() => aplicar(false)} disabled={cargando} className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs disabled:opacity-50">
        Desactivar
      </button>
    </div>
  )
}
