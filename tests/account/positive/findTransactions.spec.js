import { test } from '../../_fixtures/fixturesFindTransactionsSession';
import * as allure from 'allure-js-commons';
import {
  DEPOSIT_TRANSACTION,
  SENT_TRANSACTION,
  RECEIVED_TRANSACTION,
} from '../../../src/common/testData/account/findTransactionsCases';
import {
  searchByAmount,
  searchByDate,
  searchByDateRange,
  searchByTransactionId,
  assertTransactionsFound,
  assertSingleTransactionFound,
} from '../../../src/ui/interfaces/findTransactions';

test('should find transactions by amount', async ({
  accountNumber,
  transactionDate,
  depositAmount,
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await searchByAmount(findTransactionsPage, accountNumber, depositAmount);

  await assertSingleTransactionFound(
    findTransactionsPage,
    { ...DEPOSIT_TRANSACTION, amount: depositAmount, date: transactionDate },
    [SENT_TRANSACTION, RECEIVED_TRANSACTION],
  );

  await searchByAmount(findTransactionsPage, accountNumber, SENT_TRANSACTION.amount);

  await assertSingleTransactionFound(
    findTransactionsPage,
    { ...SENT_TRANSACTION, date: transactionDate },
    [{ ...DEPOSIT_TRANSACTION, amount: depositAmount }, RECEIVED_TRANSACTION],
  );

  await searchByAmount(findTransactionsPage, accountNumber, RECEIVED_TRANSACTION.amount);

  await assertSingleTransactionFound(
    findTransactionsPage,
    { ...RECEIVED_TRANSACTION, date: transactionDate },
    [{ ...DEPOSIT_TRANSACTION, amount: depositAmount }, SENT_TRANSACTION],
  );
});

test('should find transactions by date', async ({
  accountNumber,
  transactionDate,
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await searchByDate(findTransactionsPage, accountNumber, transactionDate);

  await assertTransactionsFound(findTransactionsPage, 3);
});

test('should return no transactions for a date with no matches', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  await allure.severity('normal');

  await searchByDate(findTransactionsPage, accountNumber, '01-01-2020');

  await assertTransactionsFound(findTransactionsPage, 0);
});

test('should find transactions by date range', async ({
  accountNumber,
  transactionDate,
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await searchByDateRange(
    findTransactionsPage,
    accountNumber,
    transactionDate,
    transactionDate,
  );

  await assertTransactionsFound(findTransactionsPage, 3);
});

test('should return no transactions for a date range with no matches', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  await allure.severity('normal');

  await searchByDateRange(
    findTransactionsPage,
    accountNumber,
    '01-01-2020',
    '01-02-2020',
  );

  await assertTransactionsFound(findTransactionsPage, 0);
});

test('should find a transaction by ID', async ({
  accountNumber,
  transactionDate,
  depositAmount,
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await searchByAmount(findTransactionsPage, accountNumber, depositAmount);

  await findTransactionsPage.assertResultsShown();

  const transactionId = await findTransactionsPage.getTransactionId(
    DEPOSIT_TRANSACTION.description,
    depositAmount,
  );

  await searchByTransactionId(findTransactionsPage, transactionId);

  await assertSingleTransactionFound(findTransactionsPage, {
    ...DEPOSIT_TRANSACTION,
    amount: depositAmount,
    date: transactionDate,
  });
});
