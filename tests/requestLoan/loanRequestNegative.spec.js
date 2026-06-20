import { test } from '../_fixtures/fixtures';
import { label, severity } from 'allure-js-commons';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
 const MAX_LOAN_AMOUNT = '1000000';
const MIN_DOWN_PAYMENT = '100';

 test.beforeEach(async ({ page}) => {
  
   await signUpUser (page)
});
test('Successful `Loan Request` details', async ({ 
    requestLoanPage,
    page,
    homePage,
}) => {

    await label('parentSuite', 'Parabank');
    await label('suite', 'Request Loan');
    await label('subSuite', 'Loan Request Negative');
    await severity('minor');

    await homePage.clickrequestLoanButton();
    await requestLoanPage.inputLoanAmount(MAX_LOAN_AMOUNT);
    await requestLoanPage.inputDownPayment(MIN_DOWN_PAYMENT);
    await requestLoanPage.clickApplyNowButton();
    await requestLoanPage.assertLoanErrorMessageIsVisible();
});