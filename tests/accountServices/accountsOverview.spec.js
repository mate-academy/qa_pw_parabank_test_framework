import { test } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { navigateToAccountDetails } from '../../src/ui/actions/accountServices/navigateToAccountDetails';
import { EPICS, FEATURES, SEVERITY } from '../../src/constants/index.js';

test.describe('Accounts Overview Tests', () => {
  test('Logged in user can view accounts overview', async ({
    loggedInUser,
    accountsOverviewPage,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.ACCOUNTS_OVERVIEW);
    await allure.story('User is able to view accounts overview');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('positive', 'accounts', 'overview');

    await accountsOverviewPage.open();
    await accountsOverviewPage.assertTitleContainsText();
    await accountsOverviewPage.assertAccountTableIsVisible();
  });

  test('User can navigate to account details', async ({
    page,
    loggedInUser,
    accountsOverviewPage,
    accountDetailsPage,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.ACCOUNTS_OVERVIEW);
    await allure.story('User is able to navigate to account details');
    await allure.severity(SEVERITY.NORMAL);
    await allure.tag('positive', 'accounts', 'details');

    await accountsOverviewPage.open();
    await navigateToAccountDetails(page);
    await accountDetailsPage.assertAccountDetailsPageDisplayed();
  });

  test('User can view account activity', async ({
    page,
    loggedInUser,
    accountsOverviewPage,
    accountDetailsPage,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.ACCOUNTS_OVERVIEW);
    await allure.story('User is able to view account activity');
    await allure.severity(SEVERITY.NORMAL);
    await allure.tag('positive', 'accounts');

    await accountsOverviewPage.open();
    await navigateToAccountDetails(page);
    await accountDetailsPage.assertActivityFiltersVisible();
  });
});
