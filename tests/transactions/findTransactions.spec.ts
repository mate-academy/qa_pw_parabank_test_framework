import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { FindTransactionsPage } from '../../src/ui/pages/FindTransactionsPage';

test.describe('Transactions', () => {
  test.describe('Find Transactions', () => {
    test('User can search transactions by account', async ({ page }) => {
      allure.parentSuite('Transactions');
      allure.suite('Find Transactions');
      allure.subSuite('Logged in user');
      allure.severity('critical');

      const loginPage = new LoginPage(page);
      const findTransactionsPage = new FindTransactionsPage(page);

      // 1️⃣ Logowanie
      await test.step('Login user', async () => {
        await loginPage.open();
        await loginPage.login('john', 'demo');
      });

      // 2️⃣ Otwórz stronę "Find Transactions"
      await test.step('Open Find Transactions page', async () => {
        await findTransactionsPage.openPage();
      });

      // 3️⃣ Wyszukaj transakcje po koncie
      await test.step('Search transactions by account', async () => {
        await findTransactionsPage.searchByAccount('13344'); // przykładowy numer konta
      });

      // 4️⃣ Weryfikacja wyników
      await test.step('Verify transactions are displayed', async () => {
        const count = await findTransactionsPage.getResultsCount();
        expect(count).toBeGreaterThan(0);
        console.log('Znalezione transakcje:', count);
      });
    });
  });
});
