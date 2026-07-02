'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function ResetForm() {
  const searchParams = useSearchParams()
  const step = searchParams.get('step')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRequestReset(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/reset-password?step=update`,
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setMessage('Email enviado. Revisa tu bandeja de entrada.')
    }
  }

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setMessage('Contraseña actualizada correctamente.')
      setTimeout(() => { window.location.href = '/login' }, 2000)
    }
  }

  if (step === 'update') {
    return (
      <>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-5)' }}>Nueva contraseña</h2>
        {message ? (
          <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--ryn-success)' }}>{message}</p>
        ) : (
          <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input
              label="Nueva contraseña"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirmar contraseña"
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            {error && <p role="alert" style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ryn-danger)' }}>{error}</p>}
            <Button type="submit" disabled={loading} fullWidth shape="rounded">
              {loading ? 'Guardando…' : 'Guardar contraseña'}
            </Button>
          </form>
        )}
      </>
    )
  }

  return (
    <>
      <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>Restablecer contraseña</h2>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>
        Introduce tu email y te enviaremos un enlace.
      </p>
      {message ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ryn-success)', marginBottom: 'var(--space-5)' }}>{message}</p>
          <Link href="/login" style={{ color: 'var(--accent)', fontSize: 'var(--text-sm)' }}>Volver al inicio de sesión</Link>
        </div>
      ) : (
        <>
          <form onSubmit={handleRequestReset} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input
              label="Email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p role="alert" style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ryn-danger)' }}>{error}</p>}
            <Button type="submit" disabled={loading} fullWidth shape="rounded">
              {loading ? 'Enviando…' : 'Enviar enlace'}
            </Button>
          </form>
          <p style={{ marginTop: 'var(--space-5)', textAlign: 'center', fontSize: 'var(--text-sm)' }}>
            <Link href="/login" style={{ color: 'var(--accent)' }}>Volver al inicio de sesión</Link>
          </p>
        </>
      )}
    </>
  )
}
