import { test } from '../../../_fixtures/fixtures';

import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { openNewCheckingAccount } from '../../../../src/ui/actions/auth//openNewCheckingAccount';






test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  

});

test('Assert Account Details test', async ({ 
  accountsActivityFilteringAndDetailsPage, 
  accountOverviewPage,
}) => {

  
  await accountOverviewPage.clickAccountsOverviewLink();
  const accountMainData = await accountOverviewPage.getMainAccountData();
  const mainAccountBalance = await accountOverviewPage.getMainAccountBalanceCellData();
  const mainAccountBalanceAvailableAmount = await accountOverviewPage.getMainAccountAvailableAmountCellData();
 
  await accountOverviewPage.clickMainAccountNumberCellLink();

  await accountsActivityFilteringAndDetailsPage.assertAccountDetails(accountMainData.accountNumber);
  await accountsActivityFilteringAndDetailsPage.assertAccountTypeIsValid();
  await accountsActivityFilteringAndDetailsPage.assertAccountBalance(mainAccountBalance);
  await accountsActivityFilteringAndDetailsPage.assertAccountAvailableBalance(mainAccountBalanceAvailableAmount);



});
