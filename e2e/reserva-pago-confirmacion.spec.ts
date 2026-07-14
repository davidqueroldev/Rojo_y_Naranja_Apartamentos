// TODO: este test depende del registro de invitados/Stripe, eliminado en el nuevo concepto sin registro — pendiente de decidir si se reescribe o se retira
import { test, expect } from '@playwright/test'

// Requiere: `npm run dev` y `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
// corriendo en paralelo — sin el listener, Stripe no puede avisar al webhook local y el
// pago se queda "pendiente_pago" aunque la tarjeta de prueba se cobre correctamente.

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

test('flujo crítico: reserva + pago Stripe + confirmación del propietario', async ({ page }) => {
  test.setTimeout(120000)
  const suffix = Date.now()
  const userEmail = `e2e-reserva-${suffix}@mailinator.com`
  const ownerEmail = `e2e-reserva-owner-${suffix}@mailinator.com`
  const password = 'Password123!'

  const userId = await crearUsuarioConfirmado(userEmail, password, 'E2E Reserva')
  const ownerId = await crearUsuarioConfirmado(ownerEmail, password, 'E2E Reserva Owner')
  await adminFetch(`/rest/v1/profiles?id=eq.${ownerId}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ rol: 'owner' }),
  })

  let reservaId = ''

  try {
    // --- Usuario: crear reserva y pagar con tarjeta de test ---
    await login(page, userEmail, password)

    const checkin = new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10)
    const checkout = new Date(Date.now() + 63 * 86400000).toISOString().slice(0, 10)

    const resReserva = await page.request.post('/api/reservas', {
      data: { apartamento: 'naranja', fecha_checkin: checkin, fecha_checkout: checkout, num_huespedes: 2 },
    })
    expect(resReserva.ok()).toBeTruthy()
    const dataReserva = await resReserva.json()
    reservaId = dataReserva.reserva_id
    expect(dataReserva.estado).toBe('pendiente_pago')

    const resCheckout = await page.request.post('/api/checkout', { data: { reserva_id: reservaId } })
    expect(resCheckout.ok()).toBeTruthy()
    const { url: checkoutUrl } = await resCheckout.json()

    await page.goto(checkoutUrl)
    await page.waitForTimeout(2000)
    await page.locator('input[name="cardNumber"]').fill('4242424242424242')
    await page.locator('input[name="cardExpiry"]').fill('12/34')
    await page.locator('input[name="cardCvc"]').fill('123')
    const nameField = page.locator('input[name="billingName"]')
    if (await nameField.count() > 0) await nameField.fill('E2E Reserva')
    await page.waitForTimeout(500)
    await page.locator('button[type="submit"], button:has-text("Pagar")').first().click()
    await page.waitForURL('**/user/reservas/**', { timeout: 30000 })

    // El webhook de Stripe tarda unos segundos en llegar (vía stripe listen)
    await expect(async () => {
      const res = await page.request.get(`/api/reservas/${reservaId}`)
      const data = await res.json()
      expect(data.reserva.estado).toBe('pendiente_confirmacion')
    }).toPass({ timeout: 20000 })

    // --- Propietario: confirmar la reserva ---
    await login(page, ownerEmail, password)
    const resConfirmar = await page.request.post(`/api/owner/reservas/${reservaId}/confirmar`)
    expect(resConfirmar.ok()).toBeTruthy()

    const resFinal = await page.request.get(`/api/reservas/${reservaId}`)
    const dataFinal = await resFinal.json()
    expect(dataFinal.reserva.estado).toBe('confirmada')
  } finally {
    if (reservaId) {
      await adminFetch(`/rest/v1/pagos?reserva_id=eq.${reservaId}`, { method: 'DELETE' })
      await adminFetch(`/rest/v1/reservas?id=eq.${reservaId}`, { method: 'DELETE' })
    }
    await eliminarUsuario(userId)
    await eliminarUsuario(ownerId)
  }
})
