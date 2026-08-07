import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import {
  getDefaultAccountNumber,
  openTrackedAccounts,
  makeTrackedTransfers,
  filterAccountActivityByType,
  filterAccountActivityByMonthOffset,
  assertTransactionTypeCounts,
} from '../../../src/ui/interfaces/account';

const ACCOUNTS_TO_OPEN = 2;
const TRANSFERS_TO_MAKE = 2;
const TRANSFER_AMOUNT = 50;

test('should filter account activity by transaction type and month', async ({
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

  const accounts = await openTrackedAccounts(openNewAccountPage, {
    count: ACCOUNTS_TO_OPEN,
    fromAccount: defaultAccountNumber,
  });

  await makeTrackedTransfers(transferFundsPage, accounts, {
    count: TRANSFERS_TO_MAKE,
    amount: TRANSFER_AMOUNT,
  });

  const [account] = accounts;

  await accountDetailsPage.openAndAssert(account.accountNumber);

  await filterAccountActivityByType(accountDetailsPage, 'Credit');

  await assertTransactionTypeCounts(accountDetailsPage, {
    received: account.received.length,
    sent: 0,
  });

  await filterAccountActivityByType(accountDetailsPage, 'Debit');

  await assertTransactionTypeCounts(accountDetailsPage, {
    received: 0,
    sent: account.sent.length,
  });

  await filterAccountActivityByType(accountDetailsPage, 'All');

  await filterAccountActivityByMonthOffset(accountDetailsPage, 0);

  await assertTransactionTypeCounts(accountDetailsPage, {
    received: account.received.length,
    sent: account.sent.length,
  });

  await filterAccountActivityByMonthOffset(accountDetailsPage, 1);

  await accountDetailsPage.assertNoTransactionsFound();
});
