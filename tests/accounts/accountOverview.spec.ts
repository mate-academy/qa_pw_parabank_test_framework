import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';

test.describe('Account', () => {
  test.describe('Account Overview', () => {
    test('User can see Account Overview page after login', async ({ page }) => {
      // Allure metadata
      allure.parentSuite('Account');
      allure.suite('Account Overview');
      allure.subSuite('Logged in user');
      allure.severity('critical');

      const loginPage = new LoginPage(page);

      // Krok 1: logowanie
      await test.step('Open login page and login', async () => {
        await loginPage.open();
        await loginPage.login('john', 'demo');
      });

      // Krok 2: poczekaj aż strona Accounts Overview się załaduje
      await test.step('Wait for Accounts Overview page to load', async () => {
        await page.waitForURL('**/overview.htm', { timeout: 5000 });
      });

      // Krok 3: weryfikacja nagłówka
      await test.step('Verify user sees Accounts Overview heading', async () => {
        await page
          .locator('h1.title', { hasText: 'Accounts Overview' })
          .waitFor({ timeout: 5000 });
        await expect(
          page.locator('h1.title', { hasText: 'Accounts Overview' }),
        ).toBeVisible();
      });

      // Krok 4: weryfikacja pierwszej tabeli na stronie
      await test.step('Verify Accounts table is visible', async () => {
        await page.locator('table').first().waitFor({ timeout: 5000 });
        await expect(page.locator('table').first()).toBeVisible();
      });
    });
  });
});
