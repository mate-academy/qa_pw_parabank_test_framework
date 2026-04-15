import { test } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { createNewAccount } from '../../../src/ui/actions/account/createNewAccount';
import { calculateBalance, formatCurrency } from '../../../src/common/helpers/balanceHelper';


let currentAccountID;
let initialBalance;

test.beforeEach(async ({ page, user, accountsOverviewPage }) => {
  await registerUser(page, user);
  await accountsOverviewPage.open();
  currentAccountID = await accountsOverviewPage.getFirstAccountId();
  initialBalance = await accountsOverviewPage.getAccountBalance(currentAccountID);
  await createNewAccount(page, 'SAVINGS', user);
});
test('Successful transfer funds test', async ({ openAccountPage, transferFundsPage, accountsOverviewPage }) => {
  const newAccountId = await openAccountPage.getNewAccountId();
  await transferFundsPage.open();
  await transferFundsPage.transferFunds(100, currentAccountID, newAccountId);
  await transferFundsPage.assertTransferSuccess(100, currentAccountID, newAccountId);
  await accountsOverviewPage.open();
  await accountsOverviewPage.assertAccountIsVisible(currentAccountID);
  await accountsOverviewPage.assertAccountIsVisible(newAccountId);
  await accountsOverviewPage.assertAccountBalance(newAccountId, formatCurrency(200));
  await accountsOverviewPage.assertAccountBalance(currentAccountID, calculateBalance(initialBalance, -200));
  await accountsOverviewPage.assertTotalBalance(initialBalance);
})

