import { test, expect } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { ACCOUNT_TYPES, ACCOUNT_TYPE_NAMES, EPICS, FEATURES, SEVERITY } from '../../src/constants/index.js';

test.describe('Open New Account Tests', () => {
  const accountTypes = [
    { type: ACCOUNT_TYPES.CHECKING, name: ACCOUNT_TYPE_NAMES.CHECKING },
    { type: ACCOUNT_TYPES.SAVINGS, name: ACCOUNT_TYPE_NAMES.SAVINGS },
  ];

  accountTypes.forEach(({ type, name }) => {
    test(`User can open a new ${name} account`, async ({
      loggedInUser,
      openNewAccountPage,
    }) => {
      await allure.epic(EPICS.ACCOUNT_SERVICES);
      await allure.feature(FEATURES.OPEN_NEW_ACCOUNT);
      await allure.story('User is able to open new checking/savings accounts');
      await allure.severity(SEVERITY.CRITICAL);
      await allure.tag('positive', 'account', 'create', 'parametrized');

      await openNewAccountPage.open();
      await openNewAccountPage.fillAccountTypeDropdown(type);
      await openNewAccountPage.clickOpenNewAccountButton();

      await openNewAccountPage.assertSuccessTitleContainsText();
      await openNewAccountPage.assertNewAccountIdLinkIsVisible();
    });
  });

  test('User can navigate to new account details', async ({
    loggedInUser,
    openNewAccountPage,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.OPEN_NEW_ACCOUNT);
    await allure.story('User is able to view details of newly created account');
    await allure.severity(SEVERITY.NORMAL);
    await allure.tag('positive', 'account', 'navigation');

    await openNewAccountPage.open();
    await openNewAccountPage.fillAccountTypeDropdown(ACCOUNT_TYPES.CHECKING);
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertNewAccountIdLinkIsVisible();

    const accountId = await openNewAccountPage.getNewAccountId();
    await openNewAccountPage.clickNewAccountIdLink();
    await openNewAccountPage.assertAccountDetailsPageDisplayed(accountId);
  });
});
