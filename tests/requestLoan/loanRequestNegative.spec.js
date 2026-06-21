import { test } from '../_fixtures/fixtures';
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

    await homePage.clickrequestLoanButton();
    await requestLoanPage.inputLoanAmount(MAX_LOAN_AMOUNT);
    await requestLoanPage.inputDownPayment(MIN_DOWN_PAYMENT);
    await requestLoanPage.clickApplyNowButton();
    await requestLoanPage.assertLoanErrorMessageIsVisible();
});