'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nueva contraseña</h2>
        {message ? (
          <p className="text-sm text-green-600 text-center">{message}</p>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md text-sm transition disabled:opacity-60"
            >
              {loading ? 'Guardando...' : 'Guardar contraseña'}
            </button>
          </form>
        )}
      </>
    )
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Restablecer contraseña</h2>
      <p className="text-sm text-gray-500 mb-6">
        Introduce tu email y te enviaremos un enlace.
      </p>
      {message ? (
        <div className="text-center">
          <p className="text-sm text-green-600 mb-6">{message}</p>
          <Link href="/login" className="text-red-600 hover:underline text-sm">
            Volver al inicio de sesión
          </Link>
        </div>
      ) : (
        <>
          <form onSubmit={handleRequestReset} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md text-sm transition disabled:opacity-60"
            >
              {loading ? 'Enviando...' : 'Enviar enlace'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            <Link href="/login" className="text-red-600 hover:underline">
              Volver al inicio de sesión
            </Link>
          </p>
        </>
      )}
    </>
  )
}
