import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test('Account overview and details should match', async ({
  page,
  user,
  overviewPage,
  accountServicesPanel,
  accountDetailsPage,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

  // Create new user
  await test.step('Sign up new user', async () => {
    await signUpUser(page, user);
  });

  let accountRows;

  // Check account summary
  await test.step('Account overview and check balance summary', async () => {
    await accountServicesPanel.clickAccountsOverviewLink();
    accountRows = await overviewPage.getAllRowsData();
    await overviewPage.assertTotalBalanceMatchesSum();
  });

  // Check account details
  await test.step('Account details and check values', async () => {
    await overviewPage.clickAccountLinkByAccountText();
    await accountDetailsPage.assertAccountDetailsIsCorrect(accountRows[0]);
  });
});
