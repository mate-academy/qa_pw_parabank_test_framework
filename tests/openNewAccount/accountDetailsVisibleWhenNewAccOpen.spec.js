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
    await label('parentSuite', 'Parabank');
    await label('suite', 'Open New Account');
    await label('subSuite', 'Account Details Visible When New SAVING Account Open');
    await severity('normal');


    await openNewAccountPage.open();
    await openNewAccountPage.selectSavingAccountType();   
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpened();
    await openNewAccountPage.clickNewAccountIdButton();
    await accountDetailsPage.assertAccountDetailsIsVisible();
    await accountDetailsPage.assertAccountBalanceIsVisible();
    await accountDetailsPage.assertAccountTypeIsVisible('SAVING');

    
    
  });

  test('Successful account creation with `Checking` type', async ({
    openNewAccountPage,
    homePage,
    overviewPage,
    accountDetailsPage,

  }) => {
    await label('parentSuite', 'Parabank');
    await label('suite', 'Open New Account');
    await label('subSuite', 'Account Details Visible When New CHECKING Account Open');
    await severity('normal');
    await openNewAccountPage.open();
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpened();
    await openNewAccountPage.clickNewAccountIdButton();
    await accountDetailsPage.assertAccountBalanceIsVisible();
    await accountDetailsPage.assertAccountTypeIsVisible('CHECKING');
  });
});