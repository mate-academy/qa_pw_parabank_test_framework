import { test } from '@playwright/test';
import { LoginPage } from '../../src/ui/pages/auth/LoginPage';
import { BillPayPage } from '../../src/ui/pages/payments/BillPayPage';
import { validUser } from '../_fixtures/user.fixture';

test.describe('Payments - Bill Pay', () => {
  let loginPage: LoginPage;
  let billPayPage: BillPayPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    billPayPage = new BillPayPage(page);
    await loginPage.open();
    await loginPage.signIn(validUser.username, validUser.password);
  });

  test('Pay bill successfully', async () => {
    await billPayPage.open();
    await billPayPage.payBill({
      name: 'Test Payee',
      address: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
      phone: '5551234567',
      account: '12345',
      amount: '10',
    });
    await billPayPage.assertPaymentSuccessful();
  });
});
