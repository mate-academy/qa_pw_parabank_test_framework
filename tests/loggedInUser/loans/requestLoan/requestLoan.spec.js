import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

test('User can request an approved loan', async ({
  accountDetailsPage,
  approvedLoanData,
  loggedInUser,
  requestLoanPage,
}) => {
  await allure.severity('critical');

  await requestLoanPage.open();
  await requestLoanPage.requestLoan(approvedLoanData);

  const loanAccountNumber = await requestLoanPage.assertLoanWasApproved();

  await requestLoanPage.openLoanAccountDetails();
  await accountDetailsPage.assertAccountDetailsAreDisplayed(loanAccountNumber);
  await accountDetailsPage.assertAccountTypeIs('LOAN');
});

test('Loan is denied when down payment exceeds available funds', async ({
  deniedLoanData,
  loggedInUser,
  requestLoanPage,
}) => {
  await allure.severity('normal');

  await requestLoanPage.open();
  await requestLoanPage.requestLoan(deniedLoanData);
  await requestLoanPage.assertLoanWasDenied();
});
