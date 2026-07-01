'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function RetryPaymentButton({ reservaId }: { reservaId: string }) {
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function reintentar() {
    setCargando(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reserva_id: reservaId }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'No se pudo iniciar el pago')
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo iniciar el pago')
      setCargando(false)
    }
  }

  return (
    <div className="mt-4">
      <Button variant="primary" onClick={reintentar} disabled={cargando}>
        {cargando ? 'Redirigiendo…' : 'Reintentar pago'}
      </Button>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  )
}
