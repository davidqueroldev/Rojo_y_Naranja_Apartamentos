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
      <span className="text-[var(--text-muted)]">IA para todas:</span>
      <button
        onClick={() => aplicar(true)}
        disabled={cargando}
        className="px-2 py-1 rounded text-xs disabled:opacity-50"
        style={{ background: 'var(--ryn-plata-soft)', color: 'var(--ryn-plata-dark)' }}
      >
        Activar
      </button>
      <button
        onClick={() => aplicar(false)}
        disabled={cargando}
        className="px-2 py-1 rounded text-xs disabled:opacity-50"
        style={{ background: 'var(--surface-sunken)', color: 'var(--text-muted)' }}
      >
        Desactivar
      </button>
    </div>
  )
}
