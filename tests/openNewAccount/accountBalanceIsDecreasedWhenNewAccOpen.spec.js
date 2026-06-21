import { test  } from '../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';


test.describe('Successful `Account Creation` flow test', () => {
  let user;

  test.beforeEach(async ({ page}) => {
  
   user = await signUpUser (page)
});
  test('Successful account creation with `Saving` type', async ({
    openNewAccountPage,
    homePage,
    overviewPage,
  }) => {
     await label('parentSuite', 'Parabank');
    await label('suite', 'Open New Account');
    await label('subSuite', 'Account Balance is Decreased When New SAVING Account Open');
    await severity('critical');


    await openNewAccountPage.open();
    await openNewAccountPage.selectSavingAccountType();
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpened();
    await homePage.clickAccountOverviewButton();
    await overviewPage.assertRightFirstRowBalance();
    await overviewPage.assertRightSecondAccBalance();
    
    
  });

  test('Successful account creation with `Checking` type', async ({
    openNewAccountPage,
    homePage,
    overviewPage,
  }) => {
    await label('parentSuite', 'Parabank');
    await label('suite', 'Open New Account');
    await label('subSuite', 'Account Balance is Decreased When New CHECKING Account Open');
    await severity('critical');


    await openNewAccountPage.open();
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpened();
    await homePage.clickAccountOverviewButton();
     await overviewPage.assertRightFirstRowBalance();
    await overviewPage.assertRightSecondAccBalance();

  });
});
