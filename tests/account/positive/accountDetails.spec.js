import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import {
  getDefaultAccountNumber,
  openTrackedAccounts,
  makeTrackedTransfers,
  assertAccountBalances,
  assertAccountActivity,
} from '../../../src/ui/interfaces/account';

// See JSDoc on openTrackedAccounts/makeTrackedTransfers (interfaces/account.js)
// for the valid ranges of these three and why.
const ACCOUNTS_TO_OPEN = 2;
const TRANSFERS_TO_MAKE = 1;
const TRANSFER_AMOUNT = 50;

test('should show correct account balances and activity after opening accounts and transferring funds', async ({
  page,
  user,
  accountsOverviewPage,
  openNewAccountPage,
  transferFundsPage,
  accountDetailsPage,
}) => {
  await allure.severity('critical');

  await registerNewUser(page, user);

  const defaultAccountNumber = await getDefaultAccountNumber(accountsOverviewPage);

  const accounts = await openTrackedAccounts(openNewAccountPage, accountsOverviewPage, {
    count: ACCOUNTS_TO_OPEN,
    fromAccount: defaultAccountNumber,
  });

  await makeTrackedTransfers(transferFundsPage, accounts, {
    count: TRANSFERS_TO_MAKE,
    amount: TRANSFER_AMOUNT,
  });

  await assertAccountBalances(accountsOverviewPage, accounts);
  await assertAccountActivity(accountsOverviewPage, accountDetailsPage, accounts);
});
