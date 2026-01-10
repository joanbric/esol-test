import { expect, test } from '@playwright/test'

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
    for (const input of taskInputs) {
      await input.fill(`Task ${index}`)
      index++
    }

    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByLabel('Title')).toBeEmpty()
    await expect(page.getByLabel('Description')).toBeEmpty()
  })
})

test.describe('Create a new WA1 test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/create/writing/A1')
    await expect(page.getByText('Create Writing A1')).toBeVisible()
  })

  test('Successful creation with all fields', async ({ page }) => {
    // Basic Info
    await page.locator('#testTitle').fill('Comprehensive WA1 Test')
    await page.locator('#testDescription').fill('A detailed test description for WA1')

    // Select Topic
    await page.locator('#topicId').selectOption({ label: 'Family' })

    // Select Level
    await page.locator('#levelId').selectOption({ label: 'L2' })

    // Punctuation
    await page.locator('#punctuationTitle').fill('Punctuation Exercise 1')
    await page.locator('#punctuationScript').fill('Correct this punctuation.')

    // Spelling
    await page.locator('#spellingTitle').fill('Spelling Exercise 1')
    await page.locator('#spellingScript').fill('Correct this spelling.')

    // Grammar
    await page.locator('#grammarTitle').fill('Grammar Exercise 1')
    await page.locator('#grammarScript').fill('Complete the sentence with correct grammar.')

    // Word Order - Dynamic List
    const wordOrderInputs = page.locator('input[name="wordOrders"]')
    await wordOrderInputs.nth(0).fill('Sentence 1 for word order')
    await page.getByRole('button', { name: 'Add Item' }).nth(0).click()
    await wordOrderInputs.nth(1).fill('Sentence 2 for word order')

    // Sentence Completion - Dynamic List
    const sentenceCompletionInputs = page.locator('input[name="sentenceCompletions"]')
    await sentenceCompletionInputs.nth(0).fill('Start of sentence 1')
    await page.getByRole('button', { name: 'Add Item' }).nth(1).click()
    await sentenceCompletionInputs.nth(1).fill('Start of sentence 2')

    // Write sentences with verbs - Dynamic List
    const phrasalVerbInputs = page.locator('input[name="writeSentencesWithVerbs"]')
    await phrasalVerbInputs.nth(0).fill('Verb 1 to use')
    await page.getByRole('button', { name: 'Add Item' }).nth(2).click()
    await phrasalVerbInputs.nth(1).fill('Verb 2 to use')

    // Handle alert on success
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Test created successfully!')
      await dialog.accept()
    })

    await page.getByRole('button', { name: 'Create Test' }).click()
  })

  test('Validation errors for empty fields', async ({ page }) => {
    // Submit without filling anything
    await page.getByRole('button', { name: 'Create Test' }).click()

    // check for validation messages
    await expect(page.getByText('Validation Error')).toBeVisible()
  })

  test('Dynamic list manipulations (Add/Remove)', async ({ page }) => {
    const wordOrderInputs = page.locator('input[name="wordOrders"]')
    const addWordOrderBtn = page.getByRole('button', { name: 'Add Item' }).nth(0)

    // Initial item
    await expect(wordOrderInputs).toHaveCount(1)

    // Add items
    await addWordOrderBtn.click()
    await addWordOrderBtn.click()
    await expect(wordOrderInputs).toHaveCount(3)

    // Remove item
    const removeBtns = page.getByRole('button', { name: 'Remove Item' })
    await removeBtns.nth(0).click()
    await expect(wordOrderInputs).toHaveCount(2)
  })
})
