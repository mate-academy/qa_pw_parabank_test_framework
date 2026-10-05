import { test } from '../../_fixtures/fixtures';
import { generateUserData } from '../../../src/common/testData/generateUserInfo';
import { severity, Severity } from 'allure-js-commons';

test('Loan approved', async ({ 
  existingUser, 
  requestLoanPage, 
  accountOverviewPage 
}) => {
  await severity(Severity.CRITICAL);
  const loanData = generateUserData();
  await requestLoanPage.open();
  await requestLoanPage.fillLoanField(loanData.loanAmount);
  await requestLoanPage.fillDownPaymentField(loanData.downPayment);
  await requestLoanPage.selectFromAccount({ index: 0 });
  await requestLoanPage.clickApplyNowButton();
  await requestLoanPage.assertLoanIsApproved();
  const newAccountNumber = await requestLoanPage.getNewAccountNumber();
  await accountOverviewPage.open();
  await accountOverviewPage.assertAccountBalance(
    newAccountNumber, `$${loanData.loanAmount}`
  );
})