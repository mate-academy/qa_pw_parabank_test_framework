import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.describe('Bill Pay positive tests', () => {
  const paymentAmounts = [1, 10, 50];

  for (const amount of paymentAmounts) {
    test(`Pay bill successfully with amount $${amount}`, async ({
      page,
      user,
      billPayPage,
    }) => {
      await allure.severity('critical');

      await registerUser(page, user);

      await billPayPage.open();

      const payee = {
        name: 'Test Utility Company',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phone: '1234567890',
        accountNumber: '123456789',
        verifyAccount: '123456789',
        amount,
      };

      await billPayPage.fillPaymentForm(payee);
      await billPayPage.selectFirstSourceAccount();
      await billPayPage.clickSendPaymentButton();
      await billPayPage.assertPaymentSuccessful();
    });
  }
});
