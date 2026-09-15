import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { requestLoanData } from '../../../src/common/testData/requestLoanData';

// Sets without an expectedMessage describe an approved loan and are covered by
// approvedLoanRequest.spec.js.
const rejectedLoanData = requestLoanData.filter(
  ({ expectedMessage }) => expectedMessage,
);

test.beforeEach(async ({ createdAccount }) => {
  void createdAccount;

  await allure.severity('critical');
});

test.describe('Request Loan with invalid loan conditions', () => {
  for (const {
    name,
    loanAmount,
    downPayment,
    expectedMessage,
  } of rejectedLoanData) {
    test(`Loan request is denied: ${name}`, async ({ requestLoanPage }) => {
      await requestLoanPage.goToRequestLoan();

      await requestLoanPage.fillLoanAmount(loanAmount);
      await requestLoanPage.fillDownPayment(downPayment);

      await requestLoanPage.clickApplyNow();

      await requestLoanPage.verifyLoanDenied();

      await requestLoanPage.verifyErrorMessage(expectedMessage);
    });
  }
});
