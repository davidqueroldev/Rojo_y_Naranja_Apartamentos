import { test, expect } from '@playwright/test'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function adminFetch(path: string, init?: RequestInit) {
  return fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
}

async function crearUsuarioConfirmado(email: string, password: string, nombre: string) {
  const res = await adminFetch('/auth/v1/admin/users', {
    method: 'POST',
    body: JSON.stringify({ email, password, email_confirm: true, user_metadata: { nombre } }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error('No se pudo crear usuario: ' + JSON.stringify(data))
  return data.id as string
}

async function eliminarUsuario(userId: string) {
  await adminFetch(`/auth/v1/admin/users/${userId}`, { method: 'DELETE' })
}

async function login(page: import('@playwright/test').Page, email: string, password: string) {
  await page.goto('/login')
  await page.fill('input[type="email"]', email)
  await page.fill('input[type="password"]', password)
  await page.getByRole('button', { name: 'Entrar' }).click()
  await page.waitForTimeout(1500)
}

test.describe('protección de rutas por rol', () => {
  test('invitado sin sesión no accede a /user ni /owner', async ({ page }) => {
    await page.goto('/user/dashboard')
    await expect(page).toHaveURL(/\/login/)

    await page.goto('/owner/dashboard')
    await expect(page).toHaveURL(/\/login/)
  })

  test('usuario normal no accede a rutas de propietario', async ({ page }) => {
    const suffix = Date.now()
    const email = `e2e-proteccion-user-${suffix}@mailinator.com`
    const password = 'Password123!'
    const userId = await crearUsuarioConfirmado(email, password, 'E2E Proteccion User')

    try {
      await login(page, email, password)
      await page.goto('/owner/dashboard')
      await expect(page).toHaveURL(/\/unauthorized/)
    } finally {
      await eliminarUsuario(userId)
    }
  })

  test('propietario accede a /owner y a /user (rol admite ambas)', async ({ page }) => {
    const suffix = Date.now()
    const email = `e2e-proteccion-owner-${suffix}@mailinator.com`
    const password = 'Password123!'
    const userId = await crearUsuarioConfirmado(email, password, 'E2E Proteccion Owner')
    await adminFetch(`/rest/v1/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ rol: 'owner' }),
    })

    try {
      await login(page, email, password)
      await page.goto('/owner/dashboard')
      await expect(page).toHaveURL(/\/owner\/dashboard/)
    } finally {
      await eliminarUsuario(userId)
    }
  })
})
