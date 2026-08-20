import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Transfer funds between two accounts', async ({
  registeredCustomer,
  accountServicesNavPage,
  accountOverviewPage,
  openNewAccountPage,
  transferFundsPage,
}) => {
  await allure.severity(Severity.CRITICAL);

  await accountServicesNavPage.clickAccountsOverview();
  const fromAccountId = await accountOverviewPage.getFirstAccountId();

  await accountServicesNavPage.clickOpenNewAccount();
  await openNewAccountPage.openAccount('CHECKING', fromAccountId);
  await openNewAccountPage.assertAccountOpenedSuccessfully();
  const toAccountId = await openNewAccountPage.getNewAccountId();

  await accountServicesNavPage.clickTransferFunds();
  await transferFundsPage.transferFunds('100', fromAccountId, toAccountId);

  await transferFundsPage.assertTransferSuccessful(
    '$100.00',
    fromAccountId,
    toAccountId,
  );
});
