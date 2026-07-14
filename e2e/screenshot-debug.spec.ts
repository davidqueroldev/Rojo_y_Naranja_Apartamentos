// TODO: este test depende del registro de invitados/Stripe, eliminado en el nuevo concepto sin registro — pendiente de decidir si se reescribe o se retira
import { test } from '@playwright/test'

test('screenshot register', async ({ page }) => {
  await page.goto('/register', { waitUntil: 'networkidle' })
  await page.screenshot({ path: 'e2e/screenshots/register.png', fullPage: true })
})

test('screenshot login', async ({ page }) => {
  await page.goto('/login', { waitUntil: 'networkidle' })
  await page.screenshot({ path: 'e2e/screenshots/login.png', fullPage: true })
})
