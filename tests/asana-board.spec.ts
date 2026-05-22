import { test, expect, Page } from '@playwright/test';
import testCases from '../test-data/tasks.json';

const BASE_URL = 'https://animated-gingersnap-8cf7f2.netlify.app/';
const EMAIL = 'admin';
const PASSWORD = 'password123';

async function login(page: Page) {
  await page.goto(BASE_URL);

  await page.locator('input[type="text"]').fill(EMAIL);
  await page.locator('input[type="password"]').fill(PASSWORD);

  await page.getByRole('button').click();
}

async function navigateToApp(page: Page, appName: string) {
  await page.getByRole('button', { name: new RegExp(appName) }).click();

}

for (const testCase of testCases) {
  test(`${testCase.app} - ${testCase.task}`, async ({ page }) => {

    await login(page);

    await navigateToApp(page, testCase.app);

    const column = page.locator('div').filter({
      hasText: testCase.column
    }).first();

    const taskCard = column.locator('div').filter({
      hasText: testCase.task
    }).first();

    await expect(taskCard).toBeVisible();

    await expect(taskCard).toContainText(testCase.task);

    for (const tag of testCase.tags) {
      await expect(taskCard).toContainText(tag);
    }
  });
}