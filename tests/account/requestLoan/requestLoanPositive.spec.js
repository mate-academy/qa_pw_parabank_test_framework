import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';
import { expect } from '../../../src/common/helpers/pwHelpers';

const loanScenarios = [
  {
    amount: '1000',
    downPayment: '515',
    expectedStatus: 'Approved',
  },
  {
    amount: '5000',
    downPayment: '515',
    expectedStatus: 'Denied',
    expectedMessage:
      'We cannot grant a loan in that amount with your available funds.',
  },
];

for (const scenario of loanScenarios) {
  test(`Request loan - ${scenario.expectedStatus} (amount: ${scenario.amount}, downPayment: ${scenario.downPayment})`, async ({
    registeredCustomer,
    accountServicesNavPage,
    accountOverviewPage,
    requestLoanPage,
  }) => {
    await allure.severity(Severity.NORMAL);

    await accountServicesNavPage.clickAccountsOverview();
    const fromAccountId = await accountOverviewPage.getFirstAccountId();

    await accountServicesNavPage.clickRequestLoan();
    await requestLoanPage.requestLoan(
      scenario.amount,
      scenario.downPayment,
      fromAccountId,
    );

    if (scenario.expectedStatus === 'Approved') {
      await requestLoanPage.assertLoanApproved();
      const newAccountId = await requestLoanPage.getNewAccountId();

      expect(newAccountId).toMatch(/^\d+$/);
    } else {
      await requestLoanPage.assertLoanDenied(scenario.expectedMessage);
    }
  });
}
