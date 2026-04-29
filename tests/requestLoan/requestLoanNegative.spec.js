import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {
  EMPTY_LOAN_AMOUNT_MESSAGE,
  EMPTY_DOWN_PAYMENT_MESSAGE,
} from '../../src/ui/constants/requestLoanErrorMessages';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Loan request is denied for an excessively large loan amount', async ({
  requestLoanPage,
}) => {
  await requestLoanPage.open();
  await requestLoanPage.fillLoanAmountField(1000000);
  await requestLoanPage.fillDownPaymentField(0);
  await requestLoanPage.clickApplyNowButton();
  await requestLoanPage.assertLoanRequestProcessed();
  await requestLoanPage.assertLoanDenied();
});

const validationParameters = [
  {
    loanAmount: '',
    downPayment: '100',
    message: EMPTY_LOAN_AMOUNT_MESSAGE,
    title: 'empty loan amount',
  },
  {
    loanAmount: '1000',
    downPayment: '',
    message: EMPTY_DOWN_PAYMENT_MESSAGE,
    title: 'empty down payment',
  },
];

validationParameters.forEach(({ loanAmount, downPayment, message, title }) => {
  test.describe('Request loan validation tests', () => {
    test(`Request loan with ${title}`, async ({ requestLoanPage }) => {
      await requestLoanPage.open();
      await requestLoanPage.fillLoanAmountField(loanAmount);
      await requestLoanPage.fillDownPaymentField(downPayment);
      await requestLoanPage.clickApplyNowButton();
      await requestLoanPage.assertErrorMessageContainsText(message);
    });
  });
});
