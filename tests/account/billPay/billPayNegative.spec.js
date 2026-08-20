import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';
import { generateBillPayData } from '../../../src/common/testData/generateBillPayData';

const requiredFieldCases = [
  {
    field: 'payeeName',
    locatorKey: 'payeeNameError',
    message: 'Payee name is required.',
  },
  {
    field: 'street',
    locatorKey: 'streetError',
    message: 'Address is required.',
  },
  { field: 'city', locatorKey: 'cityError', message: 'City is required.' },
  { field: 'state', locatorKey: 'stateError', message: 'State is required.' },
  {
    field: 'zipCode',
    locatorKey: 'zipCodeError',
    message: 'Zip Code is required.',
  },
  {
    field: 'phoneNumber',
    locatorKey: 'phoneNumberError',
    message: 'Phone number is required.',
  },
];

test.describe('Bill Pay negative tests', () => {
  for (const { field, locatorKey, message } of requiredFieldCases) {
    test(`Bill Pay with empty '${field}'`, async ({
      registeredCustomer,
      accountServicesNavPage,
      accountOverviewPage,
      billPayPage,
    }) => {
      await allure.severity(Severity.NORMAL);

      await accountServicesNavPage.clickAccountsOverview();
      const fromAccountId = await accountOverviewPage.getFirstAccountId();

      const payee = { ...generateBillPayData(), [field]: '' };

      await accountServicesNavPage.clickBillPay();
      await billPayPage.submitBillPayForm(payee, fromAccountId);

      await billPayPage.assertFieldErrorIsVisible(
        billPayPage[locatorKey],
        message,
      );
    });
  }

  test('Bill Pay with mismatched Account # and Verify Account #', async ({
    registeredCustomer,
    accountServicesNavPage,
    accountOverviewPage,
    billPayPage,
  }) => {
    await allure.severity(Severity.NORMAL);

    await accountServicesNavPage.clickAccountsOverview();
    const fromAccountId = await accountOverviewPage.getFirstAccountId();

    const payee = { ...generateBillPayData(), verifyAccount: '564564564' };

    await accountServicesNavPage.clickBillPay();
    await billPayPage.submitBillPayForm(payee, fromAccountId);

    await billPayPage.assertFieldErrorIsVisible(
      billPayPage.verifyAccountMismatchError,
      'The account numbers do not match.',
    );
  });
});
