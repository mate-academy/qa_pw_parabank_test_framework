import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

 test.beforeEach(async ({ page}) => {
  
   await signUpUser (page)
});
test.describe('Successful `Account Creation` flow test', (
  
) => {
  test('Successful account creation with `Saving` type', async ({
    
    openNewAccountPage,
    homePage,
    overviewPage,
    page,
    accountDetailsPage,
  }) => {
    const userType = 

    await openNewAccountPage.open();
    await openNewAccountPage.selectSavingAccountType();   
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpened();
    await openNewAccountPage.clickNewAccountIdButton();
    await accountDetailsPage.assertAccountDetailsIsVisible();
    await accountDetailsPage.assertAccountBalancelsIsVisible();
    await accountDetailsPage.assertAccountTypelsIsVisible('SAVING');

    
    
  });

  test('Successful account creation with `Checking` type', async ({
    openNewAccountPage,
    homePage,
    overviewPage,
    accountDetailsPage,

  }) => {
    await openNewAccountPage.open();
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpened();
    await openNewAccountPage.clickNewAccountIdButton();
    await accountDetailsPage.assertAccountBalancelsIsVisible();
    await accountDetailsPage.assertAccountTypelsIsVisible('CHECKING');
  });
});