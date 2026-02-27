import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { openNewCheckingAccount } from '../../../src/ui/actions/auth/openNewCheckingAccount'






test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  await openNewCheckingAccount(page, user);

});

test('Successful `Transfer Funds` flow test', async ({ 
  transferFundsPage, 
  accountOverviewPage,
}) => {

  
  await accountOverviewPage.clickAccountsOverviewLink();
  const accountMainData = await accountOverviewPage.getMainAccountData();
  const accountSecondData = await accountOverviewPage.getSecondAccountData();

  await accountOverviewPage.clickTransferFundsLink();
  await transferFundsPage.fillRandomAmount();
  await transferFundsPage.selectFromAccountIdOption(accountMainData.accountNumber);
  await transferFundsPage.selecttoAccountIdOption(accountSecondData.secondAccountNumber);

  await transferFundsPage.clickTransferFundsButton();
  await transferFundsPage.assertTransferCompleteIsVisible();



});
