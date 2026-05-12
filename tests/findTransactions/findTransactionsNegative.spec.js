import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { NO_RESULTS_MESSAGE } from '../../src/ui/constants/findTransactionsErrorMessages';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Find transactions by amount with no matching results', async ({
  accountOverviewPage,
  findTransactionsPage,
}) => {
  await accountOverviewPage.open();
  const accountId = await accountOverviewPage.getFirstAccountId();

  await findTransactionsPage.open();
  await findTransactionsPage.selectAccount(accountId);
  await findTransactionsPage.fillAmountField(999999.99);
  await findTransactionsPage.clickFindByAmountButton();
  await findTransactionsPage.assertNoTransactionResultsFound();
});

test('Find transactions by transaction ID with no matching results', async ({
  accountOverviewPage,
  findTransactionsPage,
}) => {
  await accountOverviewPage.open();
  const accountId = await accountOverviewPage.getFirstAccountId();

  await findTransactionsPage.open();
  await findTransactionsPage.selectAccount(accountId);
  await findTransactionsPage.fillTransactionIdField(999999999);
  await findTransactionsPage.clickFindByTransactionIdButton();
  await findTransactionsPage.assertErrorMessageContainsText(NO_RESULTS_MESSAGE);
});
