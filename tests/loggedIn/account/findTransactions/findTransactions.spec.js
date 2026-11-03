import { test } from '../../../_fixtures/fixtures';
import { transferFunds } from '../../../../src/ui/actions/loggedIn/transferFunds';
import { getCurrentDate, getDateOffset } from '../../../../src/common/helpers/dates';

const TRANSFER_AMOUNT = 40;

const invalidCriteria = [
  {
    label: 'transaction id',
    fill: page => page.findByTransactionId,
    value: 'abc',
    error: 'transactionIdError',
  },
  {
    label: 'date',
    fill: page => page.findByDate,
    value: '2026/11/03',
    error: 'transactionDateError',
  },
  {
    label: 'amount',
    fill: page => page.findByAmount,
    value: 'abc',
    error: 'amountError',
  },
];

test.describe('Find Transactions', () => {
  test.describe.configure({ timeout: 120_000 });

  for (const { label, fill, value, error } of invalidCriteria) {
    test(`Search is rejected when the ${label} is invalid`, async ({
      registeredUser,
      findTransactionsPage,
    }) => {
      await fill(findTransactionsPage).call(findTransactionsPage, registeredUser.accountId, value);
      await findTransactionsPage.assertCriteriaRejected(error);
    });
  }

  test('Search is rejected when the date range is invalid', async ({
    registeredUser,
    findTransactionsPage,
  }) => {
    await findTransactionsPage.findByDateRange(registeredUser.accountId, '11-03-2026', 'bad');
    await findTransactionsPage.assertCriteriaRejected('dateRangeError');
  });

  test.describe('Transfer lookup', () => {
    let accountId;

    const sent = {
      date: getCurrentDate(),
      name: 'Funds Transfer Sent',
      debit: TRANSFER_AMOUNT,
      credit: '',
    };
    const received = {
      date: getCurrentDate(),
      name: 'Funds Transfer Received',
      debit: '',
      credit: TRANSFER_AMOUNT,
    };

    test.beforeEach(async ({ page, registeredUser }) => {
      accountId = registeredUser.accountId;
      await transferFunds(page, {
        amount: TRANSFER_AMOUNT,
        fromAccountId: accountId,
        toAccountId: accountId,
      });
    });

    test('Transfer is found by amount', async ({ findTransactionsPage }) => {
      await findTransactionsPage.findByAmount(accountId, TRANSFER_AMOUNT);
      await findTransactionsPage.assertTransactions([sent, received]);
    });

    test('Transfer is found by date', async ({ findTransactionsPage }) => {
      await findTransactionsPage.findByDate(accountId, getCurrentDate());
      await findTransactionsPage.assertTransactions([sent, received]);
    });

    test('Transfer is found by date range', async ({ findTransactionsPage }) => {
      const today = getCurrentDate();

      await findTransactionsPage.findByDateRange(accountId, today, today);
      await findTransactionsPage.assertTransactions([sent, received]);
    });

    test('A date with no transactions shows a blank result row', async ({ findTransactionsPage }) => {
      await findTransactionsPage.findByDate(accountId, getDateOffset(-1));
      await findTransactionsPage.assertTransactions([
        {
          date: 'NaN-NaN-NaN',
          name: 'undefined',
          debit: '',
          credit: '',
        },
      ]);
    });

    test('An amount with no transactions shows a blank result row', async ({
      findTransactionsPage,
    }) => {
      await findTransactionsPage.findByAmount(accountId, 1);
      await findTransactionsPage.assertTransactions([
        {
          date: 'NaN-NaN-NaN',
          name: 'undefined',
          debit: '',
          credit: '',
        },
      ]);
    });

    test('Transfer is found by transaction id', async ({
      findTransactionsPage,
      accountDetailsActivityPage,
    }) => {
      const accountDetails = accountDetailsActivityPage(accountId);

      await accountDetails.open();
      const href = await accountDetails.accountActivity.transactionLinks.first().getAttribute('href');
      const transactionId = href.split('id=')[1];

      await findTransactionsPage.findByTransactionId(accountId, transactionId);
      await findTransactionsPage.assertTransactions([sent]);
    });
  });
});
