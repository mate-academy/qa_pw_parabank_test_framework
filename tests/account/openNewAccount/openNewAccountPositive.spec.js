import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Open a new CHECKING account', async ({
  registeredCustomer,
  accountServicesNavPage,
  accountOverviewPage,
  openNewAccountPage,
}) => {
  await allure.severity(Severity.CRITICAL);

  await accountServicesNavPage.clickAccountsOverview();
  const existingAccountId = await accountOverviewPage.getFirstAccountId();

  await accountServicesNavPage.clickOpenNewAccount();
  await openNewAccountPage.openAccount('CHECKING', existingAccountId);

  await openNewAccountPage.assertAccountOpenedSuccessfully();
});
