import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test.beforeEach(async ({ createdAccount }) => {
  void createdAccount;
  await allure.severity('normal');
});

test('User can find transaction by Date', async ({
  newAccountPage,
  accountsOverviewPage,
  transactionDetailsPage,
  findTransactionsPage,
}) => {
  const accountNumber = await newAccountPage.getNewAccountNumber();

  await newAccountPage.clickNewAccountNumber();
  await accountsOverviewPage.clickFirstTransaction();

  const transactionDate = await transactionDetailsPage.getTransactionDate();

  await findTransactionsPage.goToFindTransactions();
  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillTransactionDate(transactionDate);
  await findTransactionsPage.clickFindTransactions(1);
  await findTransactionsPage.clickFirstTransaction();
  await transactionDetailsPage.verifyTransactionDate(transactionDate);
});
