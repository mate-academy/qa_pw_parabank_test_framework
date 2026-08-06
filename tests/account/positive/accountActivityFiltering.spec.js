import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import {
  getDefaultAccountNumber,
  openTrackedAccounts,
  makeTrackedTransfers,
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

  await accountDetailsPage.open(account.accountNumber);

  await accountDetailsPage.selectTransactionType('Credit');
  await accountDetailsPage.clickGoButton();

  await accountDetailsPage.assertTransactionCountByDescription(
    'Funds Transfer Received',
    account.received.length,
  );
  await accountDetailsPage.assertTransactionCountByDescription(
    'Funds Transfer Sent',
    0,
  );

  await accountDetailsPage.selectTransactionType('Debit');
  await accountDetailsPage.clickGoButton();

  await accountDetailsPage.assertTransactionCountByDescription(
    'Funds Transfer Sent',
    account.sent.length,
  );
  await accountDetailsPage.assertTransactionCountByDescription(
    'Funds Transfer Received',
    0,
  );

  await accountDetailsPage.selectTransactionType('All');
  await accountDetailsPage.clickGoButton();

  await accountDetailsPage.selectMonthByOffset(0);
  await accountDetailsPage.clickGoButton();

  await accountDetailsPage.assertTransactionCountByDescription(
    'Funds Transfer Received',
    account.received.length,
  );
  await accountDetailsPage.assertTransactionCountByDescription(
    'Funds Transfer Sent',
    account.sent.length,
  );

  await accountDetailsPage.selectMonthByOffset(1);
  await accountDetailsPage.clickGoButton();

  await accountDetailsPage.assertNoTransactionsFound();
});
