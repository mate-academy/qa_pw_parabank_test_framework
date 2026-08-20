import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Filter account activity by transaction type', async ({
  registeredCustomer,
  accountServicesNavPage,
  accountOverviewPage,
  openNewAccountPage,
  transferFundsPage,
  accountDetailsPage,
}) => {
  await allure.severity(Severity.NORMAL);

  await accountServicesNavPage.clickAccountsOverview();
  const fromAccountId = await accountOverviewPage.getFirstAccountId();

  await accountServicesNavPage.clickOpenNewAccount();
  await openNewAccountPage.openAccount('CHECKING', fromAccountId);
  await openNewAccountPage.assertAccountOpenedSuccessfully();
  const toAccountId = await openNewAccountPage.getNewAccountId();

  await accountServicesNavPage.clickTransferFunds();
  await transferFundsPage.transferFunds('50', fromAccountId, toAccountId);
  await transferFundsPage.assertTransferSuccessful(
    '$50.00',
    fromAccountId,
    toAccountId,
  );

  await accountServicesNavPage.clickAccountsOverview();
  await accountOverviewPage.clickAccountLink(fromAccountId);

  await accountDetailsPage.filterByType('Debit');
  await accountDetailsPage.assertFilteredResultsMatchType('Debit');
});
