import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { openNewAccount } from '../../src/ui/actions/banking/openNewAccount';
import { transferFunds } from '../../src/ui/actions/banking/transferFunds';

const TRANSFER_AMOUNT = 73;

function getTodayDate() {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  await openNewAccount(page, '1');
  await transferFunds(page, TRANSFER_AMOUNT);
});

test('Find transactions by amount after a known transfer', async ({
  accountOverviewPage,
  findTransactionsPage,
}) => {
  await accountOverviewPage.open();
  const accountId = await accountOverviewPage.getFirstAccountId();

  await findTransactionsPage.open();
  await findTransactionsPage.selectAccount(accountId);
  await findTransactionsPage.fillAmountField(TRANSFER_AMOUNT);
  await findTransactionsPage.clickFindByAmountButton();
  await findTransactionsPage.assertTransactionTableVisible();
});

test('Find transactions by date range covering today', async ({
  accountOverviewPage,
  findTransactionsPage,
}) => {
  const today = getTodayDate();

  await accountOverviewPage.open();
  const accountId = await accountOverviewPage.getFirstAccountId();

  await findTransactionsPage.open();
  await findTransactionsPage.selectAccount(accountId);
  await findTransactionsPage.fillFromDateField(today);
  await findTransactionsPage.fillToDateField(today);
  await findTransactionsPage.clickFindByDateRangeButton();
  await findTransactionsPage.assertTransactionTableVisible();
});
