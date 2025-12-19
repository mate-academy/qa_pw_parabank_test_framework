import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { BillPayPage } from '../../src/ui/pages/BillPayPage';

test.describe('Transactions', () => {
  test.describe('Bill Pay', () => {
    test('User can pay a bill', async ({ page }) => {
      allure.parentSuite('Transactions');
      allure.suite('Bill Pay');
      allure.subSuite('Logged in user');
      allure.severity('critical');

      const loginPage = new LoginPage(page);
      const billPayPage = new BillPayPage(page);

      // 1️⃣ Logowanie
      await test.step('Login user', async () => {
        await loginPage.open();
        await loginPage.login('john', 'demo');
      });

      // 2️⃣ Otwórz stronę Bill Pay
      await test.step('Open Bill Pay page', async () => {
        await billPayPage.openPage();
      });

      // 3️⃣ Wypełnij formularz i wyślij płatność
      await test.step('Fill Bill Pay form and submit', async () => {
        await billPayPage.payBill({
          payeeName: 'Jan Kowalski',
          address: 'ul. Przykładowa 1',
          city: 'Warszawa',
          state: 'Mazowieckie',
          zipCode: '00-001',
          phone: '123456789',
          accountNumber: '1234567890',
          verifyAccount: '1234567890',
          amount: '100',
        });
      });

      // 4️⃣ Weryfikacja, że płatność się powiodła
      await test.step('Verify payment success message', async () => {
        await expect(page.locator('text=Bill Payment Complete')).toBeVisible();
      });
    });
  });
});
