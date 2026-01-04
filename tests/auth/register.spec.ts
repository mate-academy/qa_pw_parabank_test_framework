import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { RegisterPage } from '../../src/ui/pages/RegisterPage';

test.describe('Authentication', () => {
  test.describe('Register', () => {
    test('User can register successfully', async ({ page }) => {
      allure.parentSuite('Authentication');
      allure.suite('Register');
      allure.subSuite('Positive');
      allure.severity('critical');

      const registerPage = new RegisterPage(page);

      await test.step('Open Register page', async () => {
        await registerPage.open();
      });

      await test.step('Fill registration form', async () => {
        await registerPage.registerUser({
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          phone: '1234567890',
          ssn: '123-45-6789',
          username: 'john' + Date.now(),
          password: 'demo123',
          confirmPassword: 'demo123',
        });
      });

      await test.step('Submit registration form', async () => {
        await registerPage.submit();
      });

      await test.step('Verify registration success', async () => {
        await registerPage.verifySuccess();
      });
    });
  });
});
