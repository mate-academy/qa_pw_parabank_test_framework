import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { RequestLoanPage } from '../../src/ui/pages/RequestLoanPage';

test.describe('Loans', () => {
  test.describe('Request Loan', () => {
    test('User can request a loan', async ({ page }) => {
      allure.parentSuite('Loans');
      allure.suite('Request Loan');
      allure.subSuite('Logged in user');
      allure.severity('critical');

      const loginPage = new LoginPage(page);
      const requestLoanPage = new RequestLoanPage(page);

      // 1️⃣ Logowanie
      await test.step('Login user', async () => {
        await loginPage.open();
        await loginPage.login('john', 'demo');
      });

      // 2️⃣ Otwórz stronę Request Loan
      await test.step('Open Request Loan page', async () => {
        await requestLoanPage.openPage();
      });

      // 3️⃣ Wypełnij wniosek
      await test.step('Fill in loan request form', async () => {
        await requestLoanPage.requestLoan('5000', '1000', '13344'); // przykładowe wartości
      });

      // 4️⃣ Weryfikacja, że pożyczka została przyznana
      await test.step('Verify loan approval', async () => {
        await requestLoanPage.verifyLoanApproval();
      });
    });
  });
});
