import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

const ACCOUNT_TYPES = ['CHECKING', 'SAVINGS'];

for (const accountType of ACCOUNT_TYPES) {
  test(`User can open a ${accountType} account`, async ({
    accountDetailsPage,
    loggedInUser,
    openNewAccountPage,
  }) => {
    await allure.severity('critical');

    await openNewAccountPage.open();
    await openNewAccountPage.createAccount(accountType);

    const newAccountNumber = await openNewAccountPage.assertAccountWasOpened();

    await openNewAccountPage.openCreatedAccountDetails();
    await accountDetailsPage.assertAccountDetailsAreDisplayed(newAccountNumber);
    await accountDetailsPage.assertAccountTypeIs(accountType);
  });
}
