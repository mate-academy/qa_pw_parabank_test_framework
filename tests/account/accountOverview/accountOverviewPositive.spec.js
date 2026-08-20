import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Accounts Overview displays the newly created account', async ({
  registeredCustomer,
  accountServicesNavPage,
  accountOverviewPage,
}) => {
  await allure.severity(Severity.CRITICAL);

  await accountServicesNavPage.clickAccountsOverview();

  await accountOverviewPage.assertPageTitleIsVisible();
  await accountOverviewPage.assertSingleAccountWithConsistentBalance();
});
