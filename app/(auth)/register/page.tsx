'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password, nombre: form.nombre }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Error al crear la cuenta.')
      setLoading(false)
      return
    }

    router.push('/confirm')
  }

  return (
    <>
      <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-5)' }}>Crear cuenta</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Input
          label="Nombre"
          type="text"
          required
          autoComplete="given-name"
          value={form.nombre}
          onChange={(e) => update('nombre', e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
        />
        <Input
          label="Contraseña"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
        />
        <Input
          label="Confirmar contraseña"
          type="password"
          required
          autoComplete="new-password"
          value={form.confirm}
          onChange={(e) => update('confirm', e.target.value)}
        />
        {error && <p role="alert" style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--ryn-danger)' }}>{error}</p>}
        <Button type="submit" disabled={loading} fullWidth shape="rounded">
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </Button>
      </form>
      <p style={{ marginTop: 'var(--space-5)', textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Inicia sesión</Link>
      </p>
    </>
  )
}
