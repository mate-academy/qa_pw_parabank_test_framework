import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.describe('Bill Pay negative tests', () => {
  const validPayee = {
    name: 'Test Utility Company',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '1234567890',
    accountNumber: '123456789',
    verifyAccount: '123456789',
    amount: 10,
  };

  const requiredFields = [
    {
      field: 'name',
      label: 'Payee name',
      error: 'Payee name is required.',
    },
    {
      field: 'address',
      label: 'Address',
      error: 'Address is required.',
    },
    {
      field: 'city',
      label: 'City',
      error: 'City is required.',
    },
    {
      field: 'state',
      label: 'State',
      error: 'State is required.',
    },
    {
      field: 'zipCode',
      label: 'Zip code',
      error: 'Zip Code is required.',
    },
    {
      field: 'phone',
      label: 'Phone',
      error: 'Phone number is required.',
    },
    {
      field: 'accountNumber',
      label: 'Account number',
      error: 'Account number is required.',
    },
    {
      field: 'verifyAccount',
      label: 'Verify account',
      error: 'Account number is required.',
    },
    {
      field: 'amount',
      label: 'Amount',
      error: 'The amount cannot be empty.',
    },
  ];

  for (const { field, label, error } of requiredFields) {
    test(`Cannot pay bill with empty ${label}`, async ({
      page,
      user,
      billPayPage,
    }) => {
      await allure.severity('normal');

      await registerUser(page, user);
      await billPayPage.open();

      const invalidPayee = {
        ...validPayee,
        [field]: '',
      };

      await billPayPage.fillPaymentForm(invalidPayee);
      await billPayPage.selectFirstSourceAccount();
      await billPayPage.clickSendPaymentButton();

      await billPayPage.assertErrorMessage(error);
      await billPayPage.assertPaymentNotCompleted();
    });
  }

  test('Cannot pay bill with mismatched account numbers', async ({
    page,
    user,
    billPayPage,
  }) => {
    await allure.severity('critical');

    await registerUser(page, user);
    await billPayPage.open();

    const invalidPayee = {
      ...validPayee,
      verifyAccount: '987654321',
    };

    await billPayPage.fillPaymentForm(invalidPayee);
    await billPayPage.selectFirstSourceAccount();
    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertErrorMessage('The account numbers do not match.');

    await billPayPage.assertPaymentNotCompleted();
  });
});
