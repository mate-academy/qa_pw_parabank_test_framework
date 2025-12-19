import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';

test.describe('Profile', () => {
  test.describe('Logout', () => {
    test('User can log out', async ({ page }) => {
      allure.parentSuite('Profile');
      allure.suite('Logout');
      allure.subSuite('Logged in user');
      allure.severity('critical');

      const loginPage = new LoginPage(page);
      const profilePage = new ProfilePage(page);

      // 1️⃣ Logowanie
      await test.step('Login user', async () => {
        await loginPage.open();
        await loginPage.login('john', 'demo');
      });

      // 2️⃣ Wylogowanie
      await test.step('Logout user', async () => {
        await profilePage.logout();
      });

      // 3️⃣ Weryfikacja, że użytkownik wrócił do strony głównej
      await test.step('Verify user is logged out', async () => {
        await expect(page.locator('text=Customer Login')).toBeVisible();
      });
    });
  });
});
