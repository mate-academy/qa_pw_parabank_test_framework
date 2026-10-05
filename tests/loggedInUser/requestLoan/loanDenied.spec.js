import { test } from '../../_fixtures/fixtures';
import { generateUserData } from '../../../src/common/testData/generateUserInfo';
import { severity, Severity } from 'allure-js-commons';

const negativeCases = [
  { description: 'down payment exceeds account balance', 
    overrides: { downPayment: '1000' }, 
    expectedError: 'You do not have sufficient funds for the given down payment.' 
  },
  { description: 'loan amount exceeds available funds', 
    overrides: { loanAmount: '5000', downPayment: '10' }, 
    expectedError: 'We cannot grant a loan in that amount with your available funds.' 
  },
];

for (const testCase of negativeCases) {
  test(`Loan denied when ${testCase.description}`, async ({ 
    existingUser, 
    requestLoanPage 
  }) => {
    await severity(Severity.CRITICAL);
    const loanData = generateUserData(testCase.overrides);
    await requestLoanPage.open();
    await requestLoanPage.fillLoanField(loanData.loanAmount);
    await requestLoanPage.fillDownPaymentField(loanData.downPayment);
    await requestLoanPage.selectFromAccount({ index: 0 });
    await requestLoanPage.clickApplyNowButton();
    await requestLoanPage.assertErrorMessageIsShown(testCase.expectedError);
  });
}