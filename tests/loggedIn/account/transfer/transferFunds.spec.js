import { test } from '../../../_fixtures/fixtures';
import { ACCOUNT_TYPES } from '../../../../src/ui/pages/loggedIn/OpenAccountPage';
import { openNewAccount } from '../../../../src/ui/actions/loggedIn/openNewAccount';
import { transferFunds } from '../../../../src/ui/actions/loggedIn/transferFunds';
import {
  INITIAL_BALANCE,
  NEW_ACCOUNT_MINIMUM_DEPOSIT,
  balanceAfterOpeningAccounts,
} from '../../../../src/common/constants/accounts';
import { getCurrentDate } from '../../../../src/common/helpers/dates';

const INVALID_AMOUNTS = [
  { label: 'empty', amount: '' },
  { label: 'blank', amount: '   ' },
  { label: 'letters', amount: 'abc' },
  { label: 'symbols', amount: '12$' },
  { label: 'a comma', amount: '10,5' },
  { label: 'malformed number', amount: '10.5.5' },
];

test.describe('Transfer Funds', () => {
  test.describe.configure({ timeout: 120_000 });

  for (const { label, amount } of INVALID_AMOUNTS) {
    test(`Transfer is rejected when the amount is ${label}`, async ({
      registeredUser,
      transferPage,
    }) => {
      await transferPage.transfer({
        amount,
        fromAccountId: registeredUser.accountId,
        toAccountId: registeredUser.accountId,
      });
      await transferPage.assertTransferRejected();
    });
  }

  test('Transfer to the same account completes and the balance stays unchanged', async ({
    page,
    registeredUser,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    const accountId = registeredUser.accountId;
    const amount = 1;

    await transferFunds(page, {
      amount,
      fromAccountId: accountId,
      toAccountId: accountId,
    });
    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId,
        balance: INITIAL_BALANCE,
        availableBalance: INITIAL_BALANCE,
      },
    ]);
    await overviewPage.openAccount(accountId);
    await accountDetailsActivityPage(accountId).assertTransactions([
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Sent',
        debit: amount,
        credit: '',
      },
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Received',
        debit: '',
        credit: amount,
      },
    ]);
  });

  test('Transfer debits the source account and credits the destination account', async ({
    page,
    registeredUser,
    overviewPage,
  }) => {
    const sourceId = registeredUser.accountId;
    const destinationId = await openNewAccount(page, ACCOUNT_TYPES.savings, sourceId);
    const amount = 50;
    const sourceBalance = balanceAfterOpeningAccounts(1) + amount;
    const destinationBalance = NEW_ACCOUNT_MINIMUM_DEPOSIT - amount;

    await transferFunds(page, {
      amount,
      fromAccountId: destinationId,
      toAccountId: sourceId,
    });
    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId: sourceId,
        balance: sourceBalance,
        availableBalance: sourceBalance,
      },
      {
        accountId: destinationId,
        balance: destinationBalance,
        availableBalance: destinationBalance,
      },
    ]);
    await overviewPage.assertTotal(INITIAL_BALANCE);
  });

  test('Negative amount is accepted and moves the money in the opposite direction', async ({
    page,
    registeredUser,
    overviewPage,
  }) => {
    const sourceId = registeredUser.accountId;
    const destinationId = await openNewAccount(page, ACCOUNT_TYPES.savings, sourceId);
    const amount = -10;

    await transferFunds(page, {
      amount,
      fromAccountId: sourceId,
      toAccountId: destinationId,
    });
    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId: sourceId,
        balance: balanceAfterOpeningAccounts(1) - amount,
        availableBalance: balanceAfterOpeningAccounts(1) - amount,
      },
      {
        accountId: destinationId,
        balance: NEW_ACCOUNT_MINIMUM_DEPOSIT + amount,
        availableBalance: NEW_ACCOUNT_MINIMUM_DEPOSIT + amount,
      },
    ]);
  });

  test('Amount greater than the balance is accepted and the source balance becomes negative', async ({
    page,
    registeredUser,
    overviewPage,
  }) => {
    const sourceId = registeredUser.accountId;
    const destinationId = await openNewAccount(page, ACCOUNT_TYPES.savings, sourceId);
    const sourceBalance = balanceAfterOpeningAccounts(1);
    const amount = sourceBalance + 1;

    await transferFunds(page, {
      amount,
      fromAccountId: sourceId,
      toAccountId: destinationId,
    });
    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId: sourceId,
        balance: sourceBalance - amount,
        availableBalance: 0,
      },
      {
        accountId: destinationId,
        balance: NEW_ACCOUNT_MINIMUM_DEPOSIT + amount,
        availableBalance: NEW_ACCOUNT_MINIMUM_DEPOSIT + amount,
      },
    ]);
    await overviewPage.assertTotal(INITIAL_BALANCE);
  });

  test('Transfer of the full balance leaves the source at zero', async ({
    page,
    registeredUser,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    const sourceId = registeredUser.accountId;
    const destinationId = await openNewAccount(page, ACCOUNT_TYPES.savings, sourceId);
    const amount = balanceAfterOpeningAccounts(1);

    await transferFunds(page, {
      amount,
      fromAccountId: sourceId,
      toAccountId: destinationId,
    });
    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId: sourceId,
        balance: 0,
        availableBalance: 0,
      },
      {
        accountId: destinationId,
        balance: NEW_ACCOUNT_MINIMUM_DEPOSIT + amount,
        availableBalance: NEW_ACCOUNT_MINIMUM_DEPOSIT + amount,
      },
    ]);
    await overviewPage.assertTotal(INITIAL_BALANCE);
    await overviewPage.openAccount(sourceId);
    await accountDetailsActivityPage(sourceId).assertTransactions([
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Sent',
        debit: NEW_ACCOUNT_MINIMUM_DEPOSIT,
        credit: '',
      },
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Sent',
        debit: amount,
        credit: '',
      },
    ]);

    const destinationDetails = accountDetailsActivityPage(destinationId);
    await destinationDetails.open();
    await destinationDetails.assertTransactions([
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Received',
        debit: '',
        credit: NEW_ACCOUNT_MINIMUM_DEPOSIT,
      },
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Received',
        debit: '',
        credit: amount,
      },
    ]);
  });

  test('Zero amount is accepted and leaves both balances unchanged', async ({
    page,
    registeredUser,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    const sourceId = registeredUser.accountId;
    const destinationId = await openNewAccount(page, ACCOUNT_TYPES.savings, sourceId);
    const sourceBalance = balanceAfterOpeningAccounts(1);

    await transferFunds(page, {
      amount: 0,
      fromAccountId: sourceId,
      toAccountId: destinationId,
    });
    await overviewPage.open();
    await overviewPage.assertAccounts([
      {
        accountId: sourceId,
        balance: sourceBalance,
        availableBalance: sourceBalance,
      },
      {
        accountId: destinationId,
        balance: NEW_ACCOUNT_MINIMUM_DEPOSIT,
        availableBalance: NEW_ACCOUNT_MINIMUM_DEPOSIT,
      },
    ]);
    await overviewPage.assertTotal(INITIAL_BALANCE);
    await overviewPage.openAccount(sourceId);
    await accountDetailsActivityPage(sourceId).assertTransactions([
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Sent',
        debit: NEW_ACCOUNT_MINIMUM_DEPOSIT,
        credit: '',
      },
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Sent',
        debit: 0,
        credit: '',
      },
    ]);

    const destinationDetails = accountDetailsActivityPage(destinationId);
    await destinationDetails.open();
    await destinationDetails.assertTransactions([
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Received',
        debit: '',
        credit: NEW_ACCOUNT_MINIMUM_DEPOSIT,
      },
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Received',
        debit: '',
        credit: 0,
      },
    ]);
  });
});
