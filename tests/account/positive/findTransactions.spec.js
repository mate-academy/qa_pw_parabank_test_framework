import { test } from '../../_fixtures/fixturesFindTransactionsSession';
import * as allure from 'allure-js-commons';
import { OPEN_ACCOUNT_DEPOSIT } from '../../../src/ui/pages/account/OpenNewAccountPage';

function todayFormatted() {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const yyyy = today.getFullYear();

  return `${mm}-${dd}-${yyyy}`;
}

test('should find transactions by amount', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await findTransactionsPage.open();

  await findTransactionsPage.assertOpened();

  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillAmount(OPEN_ACCOUNT_DEPOSIT);
  await findTransactionsPage.clickFindByAmountButton();

  await findTransactionsPage.assertResultsShown();
  await findTransactionsPage.assertTransactionCount(1);
  await findTransactionsPage.assertTransactionVisible(
    'Funds Transfer Received',
    OPEN_ACCOUNT_DEPOSIT,
    'Credit',
    todayFormatted(),
  );
  await findTransactionsPage.assertTransactionNotVisible('Funds Transfer Sent', 30);
  await findTransactionsPage.assertTransactionNotVisible('Funds Transfer Received', 50);

  await findTransactionsPage.open();

  await findTransactionsPage.assertOpened();

  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillAmount(30);
  await findTransactionsPage.clickFindByAmountButton();

  await findTransactionsPage.assertResultsShown();
  await findTransactionsPage.assertTransactionCount(1);
  await findTransactionsPage.assertTransactionVisible(
    'Funds Transfer Sent',
    30,
    'Debit',
    todayFormatted(),
  );
  await findTransactionsPage.assertTransactionNotVisible(
    'Funds Transfer Received',
    OPEN_ACCOUNT_DEPOSIT,
  );
  await findTransactionsPage.assertTransactionNotVisible('Funds Transfer Received', 50);

  await findTransactionsPage.open();

  await findTransactionsPage.assertOpened();

  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillAmount(50);
  await findTransactionsPage.clickFindByAmountButton();

  await findTransactionsPage.assertResultsShown();
  await findTransactionsPage.assertTransactionCount(1);
  await findTransactionsPage.assertTransactionVisible(
    'Funds Transfer Received',
    50,
    'Credit',
    todayFormatted(),
  );
  await findTransactionsPage.assertTransactionNotVisible(
    'Funds Transfer Received',
    OPEN_ACCOUNT_DEPOSIT,
  );
  await findTransactionsPage.assertTransactionNotVisible('Funds Transfer Sent', 30);
});

test('should find transactions by date', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await findTransactionsPage.open();

  await findTransactionsPage.assertOpened();

  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillTransactionDate(todayFormatted());
  await findTransactionsPage.clickFindByDateButton();

  await findTransactionsPage.assertResultsShown();
  await findTransactionsPage.assertTransactionCount(3);
});

test('should return no transactions for a date with no matches', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  // Known server bug: a search with no matches returns one malformed row
  // ("NaN-NaN-NaN" / "undefined") instead of an empty result table.
  test.fail();

  await allure.severity('normal');

  await findTransactionsPage.open();

  await findTransactionsPage.assertOpened();

  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillTransactionDate('01-01-2020');
  await findTransactionsPage.clickFindByDateButton();

  await findTransactionsPage.assertResultsShown();
  await findTransactionsPage.assertTransactionCount(0);
});

test('should find transactions by date range', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await findTransactionsPage.open();

  await findTransactionsPage.assertOpened();

  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillFromDate(todayFormatted());
  await findTransactionsPage.fillToDate(todayFormatted());
  await findTransactionsPage.clickFindByDateRangeButton();

  await findTransactionsPage.assertResultsShown();
  await findTransactionsPage.assertTransactionCount(3);
});

test('should return no transactions for a date range with no matches', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  // Known server bug: a search with no matches returns one malformed row
  // ("NaN-NaN-NaN" / "undefined") instead of an empty result table.
  test.fail();

  await allure.severity('normal');

  await findTransactionsPage.open();

  await findTransactionsPage.assertOpened();

  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillFromDate('01-01-2020');
  await findTransactionsPage.fillToDate('01-02-2020');
  await findTransactionsPage.clickFindByDateRangeButton();

  await findTransactionsPage.assertResultsShown();
  await findTransactionsPage.assertTransactionCount(0);
});

test('should find a transaction by ID', async ({
  accountNumber,
  findTransactionsPage,
}) => {
  await allure.severity('critical');

  await findTransactionsPage.open();

  await findTransactionsPage.assertOpened();

  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillAmount(OPEN_ACCOUNT_DEPOSIT);
  await findTransactionsPage.clickFindByAmountButton();

  await findTransactionsPage.assertResultsShown();
  const transactionId = await findTransactionsPage.getTransactionId(
    'Funds Transfer Received',
    OPEN_ACCOUNT_DEPOSIT,
  );

  await findTransactionsPage.open();

  await findTransactionsPage.assertOpened();

  await findTransactionsPage.fillTransactionId(transactionId);
  await findTransactionsPage.clickFindByIdButton();

  await findTransactionsPage.assertResultsShown();
  await findTransactionsPage.assertTransactionCount(1);
  await findTransactionsPage.assertTransactionVisible(
    'Funds Transfer Received',
    OPEN_ACCOUNT_DEPOSIT,
    'Credit',
    todayFormatted(),
  );
});
