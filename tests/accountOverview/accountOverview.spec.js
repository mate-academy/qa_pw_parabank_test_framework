import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Accounts overview page displays accounts table after login', async ({
  accountOverviewPage,
}) => {
  await accountOverviewPage.open();
  await accountOverviewPage.assertPageTitleVisible();
  await accountOverviewPage.assertAccountsTableVisible();
});

test('Clicking account link navigates to account details page', async ({
  accountOverviewPage,
  accountDetailsPage,
}) => {
  await accountOverviewPage.open();
  await accountOverviewPage.clickFirstAccountLink();
  await accountDetailsPage.assertAccountDetailsVisible();
});
