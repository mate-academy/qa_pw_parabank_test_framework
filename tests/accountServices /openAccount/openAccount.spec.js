import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/signUpUser';
import { label, severity } from 'allure-js-commons';

const accountTypes = ['CHECKING', 'SAVINGS'];

accountTypes.forEach((accountType) => {
  test(`Successfully opens new ${accountType.toLowerCase()} account`, async ({
    homePage,
    openAccountPage,
    accountOverviewPage, page, user
  }) => {
    await label('parentSuite', 'Parabank');
    await label('suite', 'Account Services');
    await label('subSuite', 'Open New Account');
    await severity('critical');

    await signUpUser(page, user);

    await homePage.open();
    await homePage.clickOpenAccountLink();
    await openAccountPage.selectAccountType(accountType);
    await openAccountPage.waitForAccountOptions();
    await openAccountPage.clickOpenAccountButton();

    const accountId = await openAccountPage.getAccountNumber();

    await openAccountPage.clickAccountIdLink();

    await accountOverviewPage.assertAccountIdValue(accountId);
    await accountOverviewPage.assertAccountType(accountType);
  })
});