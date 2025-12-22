import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';

const invalidUsers = [
  { username: '', password: '', description: 'Empty username and password' },
  { username: 'wrong', password: 'demo', description: 'Wrong username' },
  { username: 'john', password: 'wrong', description: 'Wrong password' },
];

test.describe('Authentication', () => {
  test.describe('Login', () => {
    test.describe('Negative', () => {
      for (const user of invalidUsers) {
        test(`Should not login: ${user.description}`, async ({ page }) => {
          allure.parentSuite('Authentication');
          allure.suite('Login');
          allure.subSuite('Negative');
          allure.severity('critical');

          const loginPage = new LoginPage(page); // Page Object bez fixture

          await test.step('Open Parabank login page', async () => {
            await loginPage.open();
          });

          await test.step(`Attempt login with: ${user.description}`, async () => {
            await loginPage.login(user.username, user.password);
          });

          await test.step('Verify login failed', async () => {
            await expect(page.getByText('could not be verified')).toBeVisible();
          });
        });
      }
    });
  });
});
