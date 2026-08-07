import { test } from '../../_fixtures/fixturesFindTransactionsSession';
import * as allure from 'allure-js-commons';
import { todayFormatted } from '../../../src/common/helpers/dateHelpers';
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
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await searchByAmount(findTransactionsPage, accountNumber, DEPOSIT_TRANSACTION.amount);

  await assertSingleTransactionFound(
    findTransactionsPage,
    { ...DEPOSIT_TRANSACTION, date: todayFormatted() },
    [SENT_TRANSACTION, RECEIVED_TRANSACTION],
  );

  await searchByAmount(findTransactionsPage, accountNumber, SENT_TRANSACTION.amount);

  await assertSingleTransactionFound(
    findTransactionsPage,
    { ...SENT_TRANSACTION, date: todayFormatted() },
    [DEPOSIT_TRANSACTION, RECEIVED_TRANSACTION],
  );

  await searchByAmount(findTransactionsPage, accountNumber, RECEIVED_TRANSACTION.amount);

  await assertSingleTransactionFound(
    findTransactionsPage,
    { ...RECEIVED_TRANSACTION, date: todayFormatted() },
    [DEPOSIT_TRANSACTION, SENT_TRANSACTION],
  );
});

test('should find transactions by date', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await searchByDate(findTransactionsPage, accountNumber, todayFormatted());

  await assertTransactionsFound(findTransactionsPage, 3);
});

test('should return no transactions for a date with no matches', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  // Known server bug: a search with no matches returns one malformed row
  // ("NaN-NaN-NaN" / "undefined") instead of an empty result table.
  test.fail();

  await allure.severity('normal');

  await searchByDate(findTransactionsPage, accountNumber, '01-01-2020');

  await assertTransactionsFound(findTransactionsPage, 0);
});

test('should find transactions by date range', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await searchByDateRange(
    findTransactionsPage,
    accountNumber,
    todayFormatted(),
    todayFormatted(),
  );

  await assertTransactionsFound(findTransactionsPage, 3);
});

test('should return no transactions for a date range with no matches', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  // Known server bug: a search with no matches returns one malformed row
  // ("NaN-NaN-NaN" / "undefined") instead of an empty result table.
  test.fail();

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
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await searchByAmount(findTransactionsPage, accountNumber, DEPOSIT_TRANSACTION.amount);

  await findTransactionsPage.assertResultsShown();

  const transactionId = await findTransactionsPage.getTransactionId(
    DEPOSIT_TRANSACTION.description,
    DEPOSIT_TRANSACTION.amount,
  );

  await searchByTransactionId(findTransactionsPage, transactionId);

  await assertSingleTransactionFound(findTransactionsPage, {
    ...DEPOSIT_TRANSACTION,
    date: todayFormatted(),
  });
});
