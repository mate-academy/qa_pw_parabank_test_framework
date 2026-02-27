import { test } from '../../../_fixtures/fixtures';

import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';







test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  

});

test('Assert Account activity filtering has corect headers test', async ({ 
  accountsActivityFilteringAndDetailsPage,
  accountOverviewPage,
}) => {

  
  await accountOverviewPage.clickAccountsOverviewLink();
  await accountOverviewPage.clickMainAccountNumberCellLink();

  await accountsActivityFilteringAndDetailsPage.assertDateHeader();
  await accountsActivityFilteringAndDetailsPage.assertTransactionHeader();
  await accountsActivityFilteringAndDetailsPage.assertDebitHeader();
  await accountsActivityFilteringAndDetailsPage.assertCreditHeader();

});
