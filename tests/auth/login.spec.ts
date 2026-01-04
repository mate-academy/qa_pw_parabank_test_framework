import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';

test.describe('Authentication', () => {
  test.describe('Login', () => {
    test.describe('Positive', () => {
      test('User can login with valid credentials', async ({ page }) => {
        allure.parentSuite('Authentication');
        allure.suite('Login');
        allure.subSuite('Positive');
        allure.severity('critical');

        const loginPage = new LoginPage(page);

        await test.step('Open Parabank login page', async () => {
          await loginPage.open();
        });

        await test.step('Login using valid credentials', async () => {
          await loginPage.login('john', 'demo');
        });

        await test.step('Verify user is logged in', async () => {
          await expect(
            page.getByRole('heading', { name: 'Accounts Overview' }),
          ).toBeVisible();
        });
      });
    });
  });
});
