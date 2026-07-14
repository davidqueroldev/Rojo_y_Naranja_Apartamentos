'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('rol')
      .eq('id', data.user.id)
      .single()

    router.push(profile?.rol === 'owner' ? '/owner/dashboard' : '/unauthorized')
    router.refresh()
  }

  return (
    <>
      <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-5)' }}>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Input
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Contraseña"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p role="alert" style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ryn-danger)' }}>{error}</p>}
        <Button type="submit" disabled={loading} fullWidth shape="rounded">
          {loading ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
      <div style={{ marginTop: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', textAlign: 'center', fontSize: 'var(--text-sm)' }}>
        <p style={{ margin: 0 }}>
          <Link href="/reset-password" style={{ color: 'var(--accent)' }}>¿Olvidaste tu contraseña?</Link>
        </p>
      </div>
    </>
  )
}
