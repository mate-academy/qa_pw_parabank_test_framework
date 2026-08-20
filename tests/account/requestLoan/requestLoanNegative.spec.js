import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

const invalidAmounts = ['', 'abc'];

test.describe('Request Loan negative tests', () => {
  for (const amount of invalidAmounts) {
    test(`Request loan with invalid amount '${amount || 'empty'}'`, async ({
      registeredCustomer,
      accountServicesNavPage,
      accountOverviewPage,
      requestLoanPage,
    }) => {
      await allure.severity(Severity.NORMAL);

      await accountServicesNavPage.clickAccountsOverview();
      const fromAccountId = await accountOverviewPage.getFirstAccountId();

      await accountServicesNavPage.clickRequestLoan();
      await requestLoanPage.requestLoan(amount, '515', fromAccountId);

      await requestLoanPage.assertErrorMessage();
    });
  }
});
