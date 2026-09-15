import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { shiftDateByDays } from '../../../src/common/helpers/dateHelpers';
import { DATE_RANGE_OFFSET_DAYS } from '../../../src/ui/constants/accountConstants';

test.beforeEach(async ({ createdAccount }) => {
  void createdAccount;
  await allure.severity('normal');
});

test('User can find transaction by Date Range', async ({
  newAccountPage,
  accountsOverviewPage,
  transactionDetailsPage,
  findTransactionsPage,
}) => {
  const accountNumber = await newAccountPage.getNewAccountNumber();

  await newAccountPage.clickNewAccountNumber();
  await accountsOverviewPage.clickFirstTransaction();

  const transactionDate = await transactionDetailsPage.getTransactionDate();
  const fromDate = shiftDateByDays(transactionDate, -DATE_RANGE_OFFSET_DAYS);
  const toDate = shiftDateByDays(transactionDate, DATE_RANGE_OFFSET_DAYS);

  await findTransactionsPage.goToFindTransactions();
  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillFromDate(fromDate);
  await findTransactionsPage.fillToDate(toDate);
  await findTransactionsPage.clickFindTransactions(2);
  await findTransactionsPage.clickFirstTransaction();
  await transactionDetailsPage.verifyTransactionDateInRange(fromDate, toDate);
});
