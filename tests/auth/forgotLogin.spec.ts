import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { ForgotLoginPage } from '../../src/ui/pages/ForgotLoginPage';

test.describe('Authentication', () => {
  test.describe('Forgot Login', () => {
    test('User can recover login info successfully', async ({ page }) => {
      allure.parentSuite('Authentication');
      allure.suite('Forgot Login');
      allure.subSuite('Positive');
      allure.severity('critical');

      const forgotPage = new ForgotLoginPage(page);

      // 1️⃣ Otwórz stronę Forgot Login
      await test.step('Open Forgot Login page', async () => {
        await forgotPage.open();
      });

      // 2️⃣ Wypełnij formularz
      await test.step('Fill recovery form', async () => {
        await forgotPage.recoverLogin('John', 'Doe', '123-45-6789');
      });

      // 3️⃣ Wyślij formularz
      await test.step('Submit recovery form', async () => {
        await forgotPage.submit();
      });

      // 4️⃣ Weryfikacja sukcesu
      await test.step('Verify login recovery success', async () => {
        await forgotPage.verifySuccess();
      });
    });
  });
});
