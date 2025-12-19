import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { OpenAccountPage } from '../../src/ui/pages/OpenAccountPage';

test.describe('Account', () => {
  test.describe('Open Account', () => {
    test('User can open a new account', async ({ page }) => {
      allure.parentSuite('Account');
      allure.suite('Open Account');
      allure.subSuite('Logged in user');
      allure.severity('critical');

      const loginPage = new LoginPage(page);
      const openAccountPage = new OpenAccountPage(page);

      // 1️⃣ Logowanie
      await test.step('Login user', async () => {
        await loginPage.open();
        await loginPage.login('john', 'demo');
      });

      // 2️⃣ Otwórz stronę "Open New Account"
      await test.step('Open "Open New Account" page', async () => {
        await openAccountPage.openPage();
      });

      // 3️⃣ Załóż nowe konto
      let newAccountId: string | null = null;
      await test.step('Open new account', async () => {
        await openAccountPage.openNewAccount('SAVINGS');
        newAccountId = await openAccountPage.getNewAccountId();
      });

      // 4️⃣ Weryfikacja, że konto zostało utworzone
      await test.step('Verify new account is created', async () => {
        expect(newAccountId).not.toBeNull();
        console.log('Nowe konto utworzone o ID:', newAccountId);
      });
    });
  });
});
