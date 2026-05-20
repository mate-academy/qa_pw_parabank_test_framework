import { test } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test.describe(`Accounts Overview`, () => {
  test(`Accounts overview have only one account after creation`, async ({
    signedUpUserWithOneAccount,
    accountsOverviewPage,
  }) => {
    await allure.severity('critical');

    await accountsOverviewPage.open();
    await accountsOverviewPage.assertUserHasOnlyOneAccount();
    await accountsOverviewPage.assertTotalRowIsVisible();
  });
});
