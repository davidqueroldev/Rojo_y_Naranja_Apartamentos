'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ConfirmEmailPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'error'>('loading')

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const params = new URLSearchParams(hash)

    const accessToken  = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (!accessToken || !refreshToken) {
      setStatus('error')
      return
    }

    const supabase = createClient()
    supabase.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        if (error) {
          console.error('[confirm-email]', error)
          setStatus('error')
        } else {
          router.replace('/user/dashboard')
        }
      })
  }, [router])

  if (status === 'error') {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
        fontFamily: 'var(--font-sans, system-ui)', background: 'var(--bg-page, #FBF6EE)',
        padding: 24,
      }}>
        <p style={{ fontSize: 18, color: 'var(--ryn-rojo, #AF2C0E)', fontWeight: 600, margin: 0 }}>
          El enlace no es válido o ha expirado.
        </p>
        <a href="/register" style={{ color: 'var(--ryn-naranja, #C25437)', fontSize: 14 }}>
          Volver al registro
        </a>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 12,
      fontFamily: 'var(--font-sans, system-ui)', background: 'var(--bg-page, #FBF6EE)',
    }}>
      <div style={{ width: 36, height: 36, border: '3px solid #AF2C0E', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: 'var(--ryn-ink, #1C1916)', margin: 0 }}>Confirmando tu cuenta…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
