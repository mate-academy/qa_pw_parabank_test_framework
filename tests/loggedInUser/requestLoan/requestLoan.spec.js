import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';





test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  

});

test('Successful `Request Loan` flow test', async ({ 
   
  accountOverviewPage,
  requestLoanPage,
}) => {

  const randomLoanAmount = Math.floor(Math.random() * 100) + 1;
  const randomDownPayment = Math.floor(Math.random() * 10) + 1;
  
  await accountOverviewPage.clickAccountsOverviewLink();
  const accountMainData = await accountOverviewPage.getMainAccountData();
  

  await accountOverviewPage.clickRequestLoanLink();
  await requestLoanPage.fillLoanAmountField(randomLoanAmount);
  await requestLoanPage.filldownPaymentField(randomDownPayment);
  await requestLoanPage.selectFromAccount(accountMainData.accountNumber);
  await requestLoanPage.clickapplyNowButton();

  await requestLoanPage.assertLoanApproved();








});