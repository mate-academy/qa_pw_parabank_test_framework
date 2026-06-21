import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
 const MIN_LOAN_AMOUNT = '1000';
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
    await requestLoanPage.inputLoanAmount(MIN_LOAN_AMOUNT);
    await requestLoanPage.inputDownPayment(MIN_DOWN_PAYMENT);
    await requestLoanPage.clickApplyNowButton();
    await requestLoanPage.assertLoanRequestApprovedTextVisible();
    await requestLoanPage.assertLoanStatusIs('Approved');
    await requestLoanPage.clickNewAccountIdButton();
});