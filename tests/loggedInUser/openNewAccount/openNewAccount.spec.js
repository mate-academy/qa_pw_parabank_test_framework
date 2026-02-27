import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';






test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);

});

test('Successful `Open new account` flow test', async ({ 
  openNewAccountPage,
  accountOverviewPage,
}) => {

  await accountOverviewPage.clickAccountsOverviewLink();
  const accountMainData = await accountOverviewPage.getMainAccountData();
  await accountOverviewPage.clickOpenNewAccountLink();

  
  
  await openNewAccountPage.selectCheckingTypeOfAccount();
  await openNewAccountPage.selectFromAccountIdOption(accountMainData.accountNumber);
  await openNewAccountPage.clickOpenNewAccountButton();
  await openNewAccountPage.assertAccountOpenedMessage();
  

 


});
