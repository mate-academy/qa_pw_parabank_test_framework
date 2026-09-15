import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test.beforeEach(async ({ createdAccount }) => {
  void createdAccount;
  await allure.severity('normal');
});

test('User can find transaction by Transaction ID', async ({
  newAccountPage,
  accountsOverviewPage,
  transactionDetailsPage,
  findTransactionsPage,
}) => {
  const accountNumber = await newAccountPage.getNewAccountNumber();

  await newAccountPage.clickNewAccountNumber();
  await accountsOverviewPage.clickFirstTransaction();

  const transactionId = await transactionDetailsPage.getTransactionId();

  await findTransactionsPage.goToFindTransactions();
  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillTransactionId(transactionId);
  await findTransactionsPage.clickFindTransactions(0);
  await findTransactionsPage.clickFirstTransaction();
  await transactionDetailsPage.verifyTransactionId(transactionId);
});
