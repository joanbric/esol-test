import { expect, test as setup } from '@playwright/test'
const baseURL = 'http://localhost:3000'
setup('login', async ({ page }) => {
  const urlLogin = `${baseURL}/login`

  await page.goto(urlLogin)

  const emailInput = page.locator('input#identifier-field')

  await emailInput.fill('spc.briones@gmail.com')

  await page.getByRole('button').filter({ hasText: 'Continue' }).click()

  await page.waitForLoadState('domcontentloaded')

  const passwordInput = page.locator('input#password-field')

  await passwordInput.fill('$s5%4hUG@8eM$u6Z3d')

  await page.getByRole('button').filter({ hasText: 'Continue' }).click()

  await page.waitForURL(`${baseURL}/dashboard`)

  expect(page.url()).toContain('/dashboard')
  expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

  await page.context().storageState({ path: '.auth/storageState.json' })
})
