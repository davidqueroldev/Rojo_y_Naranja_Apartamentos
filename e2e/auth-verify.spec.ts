import { test, expect } from '@playwright/test'

const TEST_EMAIL = `test_verify_${Date.now()}@mailinator.com`
const TEST_PASSWORD = 'TestPass123!'
const TEST_NOMBRE = 'Usuario Test'

test('registro: valida contraseñas no coincidentes', async ({ page }) => {
  await page.goto('/register')
  await expect(page.getByRole('heading', { name: 'Crear cuenta' })).toBeVisible()

  await page.fill('input[autocomplete="given-name"]', TEST_NOMBRE)
  await page.fill('input[type="email"]', TEST_EMAIL)
  // fill both password fields
  const pwFields = page.locator('input[type="password"]')
  await pwFields.nth(0).fill('Password1!')
  await pwFields.nth(1).fill('PasswordDIFERENTE!')
  await page.getByRole('button', { name: 'Crear cuenta' }).click()

  await expect(page.getByText('Las contraseñas no coinciden.')).toBeVisible()
  await page.screenshot({ path: 'e2e/screenshots/register-mismatch.png', fullPage: true })
})

test('registro: valida contraseña muy corta', async ({ page }) => {
  await page.goto('/register')

  await page.fill('input[autocomplete="given-name"]', TEST_NOMBRE)
  await page.fill('input[type="email"]', TEST_EMAIL)
  const pwFields = page.locator('input[type="password"]')
  // Use eval to bypass HTML5 minLength validation
  await pwFields.nth(0).evaluate((el: HTMLInputElement) => { el.removeAttribute('minlength') })
  await pwFields.nth(0).fill('corta')
  await pwFields.nth(1).fill('corta')
  await page.getByRole('button', { name: 'Crear cuenta' }).click()

  await expect(page.getByText('La contraseña debe tener al menos 8 caracteres.')).toBeVisible()
  await page.screenshot({ path: 'e2e/screenshots/register-short-pw.png', fullPage: true })
})

test('registro: crea cuenta nueva y redirige a /confirm', async ({ page }) => {
  await page.goto('/register')

  await page.fill('input[autocomplete="given-name"]', TEST_NOMBRE)
  await page.fill('input[type="email"]', TEST_EMAIL)
  const pwFields = page.locator('input[type="password"]')
  await pwFields.nth(0).fill(TEST_PASSWORD)
  await pwFields.nth(1).fill(TEST_PASSWORD)

  await page.getByRole('button', { name: 'Crear cuenta' }).click()

  // Wait for either redirect to /confirm or error message
  await Promise.race([
    page.waitForURL('**/confirm', { timeout: 15000 }),
    page.waitForSelector('p.text-red-600', { timeout: 15000 }),
  ])

  await page.screenshot({ path: 'e2e/screenshots/register-result.png', fullPage: true })

  const errorEl = page.locator('p.text-red-600')
  if (await errorEl.isVisible()) {
    const msg = await errorEl.textContent()
    throw new Error(`Register falló con error: ${msg}`)
  }

  expect(page.url()).toContain('/confirm')
})

test('login: muestra error con credenciales incorrectas', async ({ page }) => {
  await page.goto('/login')
  await expect(page.getByRole('heading', { name: 'Iniciar sesión' })).toBeVisible()

  await page.fill('input[type="email"]', 'noexiste@ejemplo.com')
  await page.fill('input[type="password"]', 'ContraseñaWrong123!')
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(page.getByText('Email o contraseña incorrectos.')).toBeVisible()
  await page.screenshot({ path: 'e2e/screenshots/login-error.png', fullPage: true })
})
