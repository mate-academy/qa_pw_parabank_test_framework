import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { TransferFundsPage } from '../../src/ui/pages/TransferFundsPage';

test.describe('Account', () => {
  test.describe('Transfer Funds', () => {
    test('User can transfer funds automatically after login', async ({
      page,
    }) => {
      allure.parentSuite('Account');
      allure.suite('Transfer Funds');
      allure.subSuite('Logged in user');
      allure.severity('critical');

      const loginPage = new LoginPage(page);
      const transferPage = new TransferFundsPage(page);

      // 1️⃣ Logowanie automatyczne
      await test.step('Open login page and login', async () => {
        await loginPage.open();
        await loginPage.login('john', 'demo'); // konto testowe
      });

      // 2️⃣ Otwórz Transfer Funds
      await test.step('Navigate to Transfer Funds page', async () => {
        await transferPage.open();
      });

      // 3️⃣ Wypełnij formularz automatycznie i wyślij
      await test.step('Transfer funds automatically', async () => {
        await transferPage.transferFunds(); // domyślna kwota 100
      });

      // 4️⃣ Weryfikacja sukcesu
      await test.step('Verify transfer success message', async () => {
        await expect(page.locator('text=Transfer Completed!')).toBeVisible();
      });
    });
  });
});
