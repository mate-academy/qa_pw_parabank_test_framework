import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Find a transaction by amount', async ({
  registeredCustomer,
  accountServicesNavPage,
  accountOverviewPage,
  openNewAccountPage,
  transferFundsPage,
  findTransactionsPage,
}) => {
  await allure.severity(Severity.NORMAL);

  await accountServicesNavPage.clickAccountsOverview();
  const fromAccountId = await accountOverviewPage.getFirstAccountId();

  await accountServicesNavPage.clickOpenNewAccount();
  await openNewAccountPage.openAccount('CHECKING', fromAccountId);
  await openNewAccountPage.assertAccountOpenedSuccessfully();
  const toAccountId = await openNewAccountPage.getNewAccountId();

  await accountServicesNavPage.clickTransferFunds();
  await transferFundsPage.transferFunds('77', fromAccountId, toAccountId);
  await transferFundsPage.assertTransferSuccessful(
    '$77.00',
    fromAccountId,
    toAccountId,
  );

  await accountServicesNavPage.clickFindTransactions();
  await findTransactionsPage.findByAmount(fromAccountId, '77.00');

  await findTransactionsPage.assertTransactionFound();
});
