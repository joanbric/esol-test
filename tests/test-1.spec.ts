import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  // await page.getByRole('textbox', { name: 'Email address' }).click()
  await page.getByRole('textbox', { name: 'Email address' }).fill('spc.briones@gmail.com')
  await page.getByRole('button', { name: 'Continue' }).click()
  // await page.getByRole('textbox', { name: 'Password' }).click()
  await page.getByRole('textbox', { name: 'Password' }).fill('$s5%4hUG@8eM$u6Z3d')
  await page.getByRole('button', { name: 'Continue' }).click()
})
