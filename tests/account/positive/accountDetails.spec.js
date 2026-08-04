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

const ACCOUNTS_TO_OPEN = 3;
const TRANSFERS_TO_MAKE = 3;
const TRANSFER_AMOUNT = 500;

test('should show correct account balances and activity after opening accounts and transferring funds', async ({
  registerPage,
  registrationData,
  accountsOverviewPage,
  openNewAccountPage,
  transferFundsPage,
  accountDetailsPage,
}) => {
  await allure.severity('critical');

  await registerNewUser(registerPage, registrationData);

  const defaultAccountNumber = await getDefaultAccountNumber(accountsOverviewPage);

  const accounts = await openTrackedAccounts(openNewAccountPage, {
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
