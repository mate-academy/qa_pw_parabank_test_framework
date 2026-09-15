import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { ACCOUNT_TYPES } from '../../../src/ui/constants/accountConstants';
import { requestLoanData } from '../../../src/common/testData/requestLoanData';

test.beforeEach(async ({ createdAccount }) => {
  void createdAccount;

  await allure.severity('critical');
});

test('User can successfully request a loan', async ({
  requestLoanPage,
  accountsOverviewPage,
}) => {
  await requestLoanPage.goToRequestLoan();

  const loan = requestLoanData[0];

  await requestLoanPage.fillLoanAmount(loan.loanAmount);
  await requestLoanPage.fillDownPayment(loan.downPayment);

  await requestLoanPage.clickApplyNow();
  await requestLoanPage.verifyLoanApproved();
  await requestLoanPage.clickNewAccountNumber();
  await accountsOverviewPage.verifyAccountType(ACCOUNT_TYPES.loan);
});
