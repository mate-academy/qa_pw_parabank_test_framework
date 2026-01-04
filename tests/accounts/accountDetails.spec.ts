import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { AccountDetailsPage } from '../../src/ui/pages/AccountDetailsPage';

test.describe('Account', () => {
  test.describe('Account Details & Activity', () => {
    test('User can view account details and filter transactions', async ({
      page,
    }) => {
      allure.parentSuite('Account');
      allure.suite('Account Details & Activity');
      allure.subSuite('Logged in user');
      allure.severity('critical');

      const loginPage = new LoginPage(page);
      const detailsPage = new AccountDetailsPage(page);

      // 1️⃣ Logowanie automatyczne
      await test.step('Login user', async () => {
        await loginPage.open();
        await loginPage.login('john', 'demo'); // poprawne dane testowe
      });

      // 2️⃣ Otwórz szczegóły pierwszego konta
      await test.step('Open Account Details page', async () => {
        await detailsPage.openFirstAccountDetails();
      });

      // 3️⃣ Filtrowanie transakcji po dacie
      await test.step('Filter transactions by date', async () => {
        await detailsPage.filterTransactions('01/01/2025', '12/31/2025');
      });

      // 4️⃣ Weryfikacja, że są jakieś transakcje
      await test.step('Verify transactions are displayed', async () => {
        const count = await detailsPage.getTransactionsCount();
        await expect(count).toBeGreaterThan(0);
      });
    });
  });
});
