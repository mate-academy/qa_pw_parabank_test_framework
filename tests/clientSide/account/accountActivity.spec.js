import { test } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { createNewAccount } from '../../../src/ui/actions/account/createNewAccount';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
  await createNewAccount(page, 'SAVINGS', user);
});
test('New account activity test', async ({ openAccountPage, accountDetailsPage }) => {
  const newAccountId = await openAccountPage.getNewAccountId();
  await openAccountPage.clickNewAccountDetailsLink(newAccountId);
  await accountDetailsPage.assertPageUrl(newAccountId);
  await accountDetailsPage.assertTransactionsTableIsVisible();
  await accountDetailsPage.assertActivityFiltersAreVisible();
})

test('New account activity filters test', async ({ openAccountPage, accountDetailsPage }) => {
  const newAccountId = await openAccountPage.getNewAccountId();
  await openAccountPage.clickNewAccountDetailsLink(newAccountId);
  await accountDetailsPage.filterActivity('All', 'Debit');
  await accountDetailsPage.assertNoTransactionsVisible();
  await accountDetailsPage.filterActivity('All', 'Credit');
  await accountDetailsPage.assertTransactionsTableIsVisible();
  await accountDetailsPage.filterActivity('January', 'All');
  await accountDetailsPage.assertNoTransactionsVisible();
  await accountDetailsPage.assertTransactionsTableIsHidden();
  await accountDetailsPage.filterActivity('All', 'All');
  await accountDetailsPage.assertTransactionsTableIsVisible();
})