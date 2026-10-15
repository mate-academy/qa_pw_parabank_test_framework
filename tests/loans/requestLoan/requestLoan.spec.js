import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.describe('Request Loan tests', () => {
  test.beforeEach(async ({ page, user, requestLoanPage }) => {
    await registerUser(page, user);
    await requestLoanPage.open();
    await requestLoanPage.selectFirstAccount();
  });

  test('Request a small loan', async ({ requestLoanPage }) => {
    await allure.severity('critical');

    const loanAmount = 100;
    const downPayment = 10;

    await requestLoanPage.fillLoanAmount(loanAmount);
    await requestLoanPage.fillDownPayment(downPayment);
    await requestLoanPage.clickApplyNowButton();

    await requestLoanPage.assertLoanRequestProcessed();
    await requestLoanPage.assertLoanApproved();
  });

  test('Request a very large loan', async ({ requestLoanPage }) => {
    await allure.severity('normal');

    const loanAmount = 1000000;
    const downPayment = 10;

    await requestLoanPage.fillLoanAmount(loanAmount);
    await requestLoanPage.fillDownPayment(downPayment);
    await requestLoanPage.clickApplyNowButton();

    await requestLoanPage.assertLoanRequestProcessed();
    await requestLoanPage.assertLoanDenied();
  });
});
