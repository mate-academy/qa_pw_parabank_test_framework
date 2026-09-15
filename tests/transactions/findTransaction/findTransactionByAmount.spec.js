import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test.beforeEach(async ({ createdAccount }) => {
  void createdAccount;
  await allure.severity('normal');
});

test('User can find transaction by Amount', async ({
  newAccountPage,
  accountsOverviewPage,
  transactionDetailsPage,
  findTransactionsPage,
}) => {
  const accountNumber = await newAccountPage.getNewAccountNumber();

  await newAccountPage.clickNewAccountNumber();
  await accountsOverviewPage.clickFirstTransaction();

  const transactionAmount = await transactionDetailsPage.getTransactionAmount();

  await findTransactionsPage.goToFindTransactions();
  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillTransactionAmount(transactionAmount);
  await findTransactionsPage.clickFindTransactions(3);
  await findTransactionsPage.clickFirstTransaction();
  await transactionDetailsPage.verifyTransactionAmount(transactionAmount);
});
