import { test } from '../../../_fixtures/fixtures';
import { ACCOUNT_TYPES } from '../../../../src/ui/pages/loggedIn/OpenAccountPage';
import { TRANSACTION_TYPES } from '../../../../src/ui/pages/loggedIn/AccountDetailsActivity';
import { openNewAccount } from '../../../../src/ui/actions/loggedIn/openNewAccount';
import { transferFunds } from '../../../../src/ui/actions/loggedIn/transferFunds';
import { NEW_ACCOUNT_MINIMUM_DEPOSIT } from '../../../../src/common/constants/accounts';
import {
  currentMonthOptionIndex,
  getCurrentDate,
  otherMonthOptionIndex,
} from '../../../../src/common/helpers/dates';

const TRANSFER_AMOUNT = 25;

test.describe('Account activity filters', () => {
  test.describe.configure({ timeout: 120_000 });

  let newAccountId;

  test.beforeEach(async ({ page, registeredUser }) => {
    newAccountId = await openNewAccount(page, ACCOUNT_TYPES.checking, registeredUser.accountId);
    await transferFunds(page, {
      amount: TRANSFER_AMOUNT,
      fromAccountId: newAccountId,
      toAccountId: registeredUser.accountId,
    });
  });

  test('Activity filters by transaction type and period', async ({ accountDetailsActivityPage }) => {
    const received = {
      date: getCurrentDate(),
      name: 'Funds Transfer Received',
      debit: '',
      credit: NEW_ACCOUNT_MINIMUM_DEPOSIT,
    };
    const sent = {
      date: getCurrentDate(),
      name: 'Funds Transfer Sent',
      debit: TRANSFER_AMOUNT,
      credit: '',
    };
    const accountDetails = accountDetailsActivityPage(newAccountId);

    await accountDetails.open();
    await accountDetails.showActivity({
      periodIndex: 0,
      transactionType: TRANSACTION_TYPES.all,
    });
    await accountDetails.assertTransactions([received, sent]);

    await accountDetails.showActivity({ transactionType: TRANSACTION_TYPES.credit });
    await accountDetails.assertTransactions([received]);

    await accountDetails.showActivity({ transactionType: TRANSACTION_TYPES.debit });
    await accountDetails.assertTransactions([sent]);

    await accountDetails.showActivity({
      periodIndex: otherMonthOptionIndex(),
      transactionType: TRANSACTION_TYPES.all,
    });
    await accountDetails.assertNoTransactions();

    await accountDetails.showActivity({
      periodIndex: currentMonthOptionIndex(),
      transactionType: TRANSACTION_TYPES.all,
    });
    await accountDetails.assertTransactions([received, sent]);
  });
});
