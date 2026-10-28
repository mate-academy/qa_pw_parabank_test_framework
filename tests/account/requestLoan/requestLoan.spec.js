import { faker } from '@faker-js/faker';

import { test } from '../../_fixtures/fixtures';

import { RequestLoanPage } from '../../../src/ui/pages/RequestLoanPage';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';

import { INSUFFICIENT_FUNDS_FOR_DOWN_PAYMENT_MESSAGE } from '../../../src/ui/constants/requestLoanMessages';

let requestLoanPage;

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);

  requestLoanPage = new RequestLoanPage(pages[0]);

  await requestLoanPage.clickRequestLoanLink();
  await requestLoanPage.assertApplyForLoanTitleIsVisible();
  await requestLoanPage.assertSourceAccountIsAvailable();
});

test.describe('Request Loan tests', () => {
  test('User can request a loan', async () => {
    const loanAmount = faker.number.int({ min: 100, max: 500 });
    const downPayment = faker.number.int({ min: 10, max: 50 });

    const accountId = await requestLoanPage.getFirstAccountId();

    await requestLoanPage.fillLoanAmountInput(loanAmount);
    await requestLoanPage.fillDownPaymentInput(downPayment);
    await requestLoanPage.selectFromAccount(accountId);

    await requestLoanPage.clickApplyNowButton();

    await requestLoanPage.assertLoanRequestProcessedTitleIsVisible();
    await requestLoanPage.assertLoanProviderIsVisible();
    await requestLoanPage.assertResponseDateIsVisible();
    await requestLoanPage.assertLoanStatusIs('Approved');
    await requestLoanPage.assertLoanWasApproved();
  });

  test('User receives denied loan request for insufficient down payment funds', async () => {
    const loanAmount = faker.number.int({
      min: 10000,
      max: 20000,
    });

    const downPayment = faker.number.int({
      min: 1000,
      max: 2000,
    });

    const accountId = await requestLoanPage.getFirstAccountId();

    await requestLoanPage.fillLoanAmountInput(loanAmount);
    await requestLoanPage.fillDownPaymentInput(downPayment);
    await requestLoanPage.selectFromAccount(accountId);

    await requestLoanPage.clickApplyNowButton();

    await requestLoanPage.assertLoanRequestProcessedTitleIsVisible();
    await requestLoanPage.assertLoanProviderIsVisible();
    await requestLoanPage.assertResponseDateIsVisible();
    await requestLoanPage.assertLoanStatusIs('Denied');
    await requestLoanPage.assertLoanWasDenied();

    await requestLoanPage.assertDeniedMessageContainsText(
      INSUFFICIENT_FUNDS_FOR_DOWN_PAYMENT_MESSAGE,
    );
  });
});
