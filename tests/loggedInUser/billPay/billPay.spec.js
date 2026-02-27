import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';





test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  

});

test('Successful `Bill Pay` flow test', async ({ 
  billPayPage, 
  accountOverviewPage,
}) => {
  const payeeInformation = generateNewUserData();
  const randomAmount = Math.floor(Math.random() * 100) + 1;
  const randomAccount = Math.floor(Math.random() * 1000) + 1;
  
  await accountOverviewPage.clickAccountsOverviewLink();
  const accountMainData = await accountOverviewPage.getMainAccountData();
  

  await accountOverviewPage.clickBillPayLink();

  await billPayPage.submitBillPaymentForm(payeeInformation, {
    accountNumber: randomAccount,
    amount: randomAmount,
    fromAccountNumber: accountMainData.accountNumber,
  });
  await billPayPage.clickSendPaymentButton();

  await billPayPage.assertBillPaymentCompleteHeaderIsVisible();







});
