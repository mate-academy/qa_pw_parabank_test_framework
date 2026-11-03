import { test } from '../../../_fixtures/fixtures';
import { ACCOUNT_TYPES } from '../../../../src/ui/pages/loggedIn/OpenAccountPage';
import { openNewAccount } from '../../../../src/ui/actions/loggedIn/openNewAccount';
import { getCurrentDate } from '../../../../src/common/helpers/dates';
import {
  INITIAL_BALANCE,
  NEW_ACCOUNT_MINIMUM_DEPOSIT,
  balanceAfterOpeningAccounts,
} from '../../../../src/common/constants/accounts';

test.describe('Source account balance', () => {
  test.describe.configure({ timeout: 180_000 });

  test('Opening a new account debits the minimum deposit from the selected account', async ({
    page,
    registeredUser,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    const sourceId = registeredUser.accountId;
    const balance = balanceAfterOpeningAccounts(1);

    await openNewAccount(page, ACCOUNT_TYPES.savings, sourceId);
    await overviewPage.open();
    await overviewPage.openAccount(sourceId);

    const accountDetails = accountDetailsActivityPage(sourceId);
    await accountDetails.assertAccountDetailsVisible({
      accountId: sourceId,
      accountType: ACCOUNT_TYPES.checking,
      balance,
      availableBalance: balance,
    });
    await accountDetails.assertTransactions([
      {
        date: getCurrentDate(),
        name: 'Funds Transfer Sent',
        debit: NEW_ACCOUNT_MINIMUM_DEPOSIT,
        credit: '',
      },
    ]);
  });

  test('Source account balance can become negative while available balance stays zero', async ({
    page,
    registeredUser,
    overviewPage,
    accountDetailsActivityPage,
  }) => {
    const sourceId = registeredUser.accountId;
    const openings = Math.floor(INITIAL_BALANCE / NEW_ACCOUNT_MINIMUM_DEPOSIT) + 1;
    const openedAccountIds = [];

    for (let i = 0; i < openings; i++) {
      openedAccountIds.push(await openNewAccount(page, ACCOUNT_TYPES.savings, sourceId));
    }

    const balance = balanceAfterOpeningAccounts(openings);
    const accounts = [
      {
        accountId: sourceId,
        balance,
        availableBalance: 0,
      },
      ...openedAccountIds.map(accountId => ({
        accountId,
        balance: NEW_ACCOUNT_MINIMUM_DEPOSIT,
        availableBalance: NEW_ACCOUNT_MINIMUM_DEPOSIT,
      })),
    ];

    await overviewPage.open();
    await overviewPage.assertAccounts(accounts);
    await overviewPage.assertTotal(INITIAL_BALANCE);
    await overviewPage.openAccount(sourceId);
    await accountDetailsActivityPage(sourceId).assertAccountDetailsVisible({
      accountId: sourceId,
      accountType: ACCOUNT_TYPES.checking,
      balance,
      availableBalance: 0,
    });
  });
});
