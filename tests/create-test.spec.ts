import { test, expect } from '@playwright/test'

test.describe('Create Test', () => {
 
  test('Create a new WA2 test', async ({ page }) => {
    await page.goto('http://localhost:3000/tests/create/writing/A2')
    await expect(page.getByText('Create Writing A2')).toBeVisible()


    await page.getByLabel('Title').fill('Test WA2')
    await page.getByLabel('Description').fill('Test WA2 description')
    await page.getByLabel('Genre').selectOption('letter')
    await page.getByLabel('Topic').selectOption('01')
    await page.getByLabel('Level').selectOption('E2')

    await page.getByRole('button', { name: 'Add Task' }).click()
    await page.getByRole('button', { name: 'Add Task' }).click()
    await page.getByRole('button', { name: 'Add Task' }).click()
    const taskInputs = await page.locator('li>input').all()

    expect(taskInputs).toHaveLength(4)

    let index = 1
    for(const input of taskInputs){
      await input.fill(`Task ${index}`)
      index++
    }

    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByLabel('Title')).toBeEmpty()
    await expect(page.getByLabel('Description')).toBeEmpty()
    
  })
})
