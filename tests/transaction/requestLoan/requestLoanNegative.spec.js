import { test } from '../../_fixtures/fixtures';
import { GENERIC_SERVER_ERROR_MESSAGE } from '../../../src/ui/constants/genericMessages';
import {
  REQUEST_LOAN_INSUFFICIENT_FUNDS_FOR_AMOUNT_ERROR_MESSAGE,
  REQUEST_LOAN_INSUFFICIENT_FUNDS_FOR_DOWN_PAYMENT_ERROR_MESSAGE,
} from '../../../src/ui/constants/transactionMessages';
import * as allure from 'allure-js-commons';

const testParameters = [
  {
    scenario: 'from account has insufficient funds for loan amount',
    amount: '100000',
    downPayment: '0',
    errorMessage: REQUEST_LOAN_INSUFFICIENT_FUNDS_FOR_AMOUNT_ERROR_MESSAGE,
  },
  {
    scenario: 'from account has insufficient funds for down payment',
    amount: '0',
    downPayment: '100000',
    errorMessage:
      REQUEST_LOAN_INSUFFICIENT_FUNDS_FOR_DOWN_PAYMENT_ERROR_MESSAGE,
  },
];

test.describe(`Request Loan negative tests`, () => {
  test(`Shows server error when fields are empty`, async ({
    signedUpUserWithOneAccount,
    requestLoanPage,
  }) => {
    await allure.severity('normal');
    await requestLoanPage.open();
    await requestLoanPage.clickApplyNowButton();
    await requestLoanPage.assertRequestLoanErrorHasText(
      GENERIC_SERVER_ERROR_MESSAGE,
    );
  });

  testParameters.forEach(({ scenario, amount, downPayment, errorMessage }) => {
    test(`Shows denial error when ${scenario}`, async ({
      signedUpUserWithOneAccount,
      requestLoanPage,
    }) => {
      await allure.severity('critical');

      const { accountData } = signedUpUserWithOneAccount;
      const fromAccountId = accountData.accountId;

      await requestLoanPage.open();
      await requestLoanPage.fillAmountField(amount);
      await requestLoanPage.fillDownPaymentField(downPayment);
      await requestLoanPage.selectFromAccountId(fromAccountId);
      await requestLoanPage.clickApplyNowButton();

      await requestLoanPage.assertLoanDenied();
      await requestLoanPage.assertRequestLoanDeniedHasText(errorMessage);
    });
  });
});
