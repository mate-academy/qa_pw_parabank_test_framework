import { test } from '../../../_fixtures/fixtures';
import { ACCOUNT_TYPES } from '../../../../src/ui/pages/loggedIn/OpenAccountPage';
import { openNewAccount } from '../../../../src/ui/actions/loggedIn/openNewAccount';
import { OpenAccountPage } from '../../../../src/ui/pages/loggedIn/OpenAccountPage';
import { getCurrentDate } from '../../../../src/common/helpers/dates';
import { NEW_ACCOUNT_MINIMUM_DEPOSIT } from '../../../../src/common/constants/accounts';

test.describe('Open Account Information', () => {
  const newlyCreatedAccount = {
    accountType: ACCOUNT_TYPES.checking,
    balance: NEW_ACCOUNT_MINIMUM_DEPOSIT,
    availableBalance: NEW_ACCOUNT_MINIMUM_DEPOSIT,
  };

  const transaction = {
    date: getCurrentDate(),
    name: 'Funds Transfer Received',
    debit: '',
    credit: NEW_ACCOUNT_MINIMUM_DEPOSIT,
  };

  test.beforeEach(async ({ page, registeredUser }) => {
    newlyCreatedAccount.accountId = await openNewAccount(
      page,
      ACCOUNT_TYPES.checking,
      registeredUser.accountId,
    );
  });

  test('User should be able to open newly opened account information page', async ({
    page,
    accountDetailsActivityPage,
  }) => {
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.clickNewAccountLink();
    await accountDetailsActivityPage(newlyCreatedAccount.accountId).assertAccountDetailsVisible(
      newlyCreatedAccount,
    );
  });

  test('The minimum deposit is credited to the new account on opening', async ({
    accountDetailsActivityPage,
  }) => {
    const accountDetails = accountDetailsActivityPage(newlyCreatedAccount.accountId);
    await accountDetails.open();
    await accountDetails.assertTransactions([transaction]);
  });
});
