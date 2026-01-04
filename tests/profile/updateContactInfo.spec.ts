import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';

test.describe('Profile', () => {
  test.describe('Update Contact Info', () => {
    test('User can update contact information', async ({ page }) => {
      allure.parentSuite('Profile');
      allure.suite('Update Contact Info');
      allure.subSuite('Logged in user');
      allure.severity('critical');

      const loginPage = new LoginPage(page);
      const profilePage = new ProfilePage(page);

      // 1️⃣ Logowanie
      await test.step('Login user', async () => {
        await loginPage.open();
        await loginPage.login('john', 'demo');
      });

      // 2️⃣ Otwórz stronę Update Contact Info
      await test.step('Open Update Contact Info page', async () => {
        await profilePage.openUpdateContactInfoPage();
      });

      // 3️⃣ Zaktualizuj dane kontaktowe
      await test.step('Update contact information', async () => {
        await profilePage.updateContactInfo({
          address: 'ul. Nowa 10',
          city: 'Warszawa',
          state: 'Mazowieckie',
          zipCode: '00-100',
          phone: '987654321',
        });
      });

      // 4️⃣ Weryfikacja komunikatu
      await test.step('Verify profile updated message', async () => {
        await expect(page.locator('text=Profile Updated')).toBeVisible();
      });
    });
  });
});
