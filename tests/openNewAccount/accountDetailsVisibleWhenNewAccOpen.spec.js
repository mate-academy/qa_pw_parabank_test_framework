import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { label, severity } from 'allure-js-commons';

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

    await label('parentSuite', 'Parabank');
    await label('suite', 'Open New Account');
    await label('subSuite', 'Account Details Visible When New Account Open');
    await severity('normal');
      
    await openNewAccountPage.open();
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpened();
    await openNewAccountPage.clickNewAccountIdButton();
    await accountDetailsPage.assertAccountBalancelsIsVisible();
    await accountDetailsPage.assertAccountTypelsIsVisible('CHECKING');
  });
});