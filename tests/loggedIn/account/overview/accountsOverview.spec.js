import { test } from '../../../_fixtures/fixtures';
import { ACCOUNT_TYPES } from '../../../../src/ui/pages/loggedIn/OpenAccountPage';
import { openNewAccount } from '../../../../src/ui/actions/loggedIn/openNewAccount';
import {
  INITIAL_BALANCE,
  NEW_ACCOUNT_MINIMUM_DEPOSIT,
  balanceAfterOpeningAccounts,
} from '../../../../src/common/constants/accounts';

test.describe('Accounts Overview', () => {
  test.describe.configure({ timeout: 120_000 });

  test('Accounts overview shows the single account created at registration', async ({
    registeredUser,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    const account = {
      accountId: registeredUser.accountId,
      accountType: ACCOUNT_TYPES.checking,
      balance: INITIAL_BALANCE,
      availableBalance: INITIAL_BALANCE,
    };

    await overviewPage.open();
    await overviewPage.assertAccounts([account]);
    await overviewPage.assertTotal(INITIAL_BALANCE);
    await overviewPage.openAccount(account.accountId);

    await accountDetailsActivityPage(account.accountId).assertAccountDetailsVisible(account);
  });

  test('Accounts overview lists every opened account with the correct balances and total', async ({
    page,
    registeredUser,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    const sourceId = registeredUser.accountId;
    const checkingId = await openNewAccount(page, ACCOUNT_TYPES.checking, sourceId);
    const savingsId = await openNewAccount(page, ACCOUNT_TYPES.savings, sourceId);
    const sourceBalance = balanceAfterOpeningAccounts(2);
    const accounts = [
      {
        accountId: sourceId,
        accountType: ACCOUNT_TYPES.checking,
        balance: sourceBalance,
        availableBalance: sourceBalance,
      },
      {
        accountId: checkingId,
        accountType: ACCOUNT_TYPES.checking,
        balance: NEW_ACCOUNT_MINIMUM_DEPOSIT,
        availableBalance: NEW_ACCOUNT_MINIMUM_DEPOSIT,
      },
      {
        accountId: savingsId,
        accountType: ACCOUNT_TYPES.savings,
        balance: NEW_ACCOUNT_MINIMUM_DEPOSIT,
        availableBalance: NEW_ACCOUNT_MINIMUM_DEPOSIT,
      },
    ];

    await overviewPage.open();
    await overviewPage.assertAccounts(accounts);
    await overviewPage.assertTotal(INITIAL_BALANCE);

    for (const account of accounts) {
      await overviewPage.open();
      await overviewPage.openAccount(account.accountId);
      await accountDetailsActivityPage(account.accountId).assertAccountDetailsVisible(account);
    }
  });
});
