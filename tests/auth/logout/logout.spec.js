import { test } from '../../_fixtures/fixtures';

import { SignInPage } from '../../../src/ui/pages/SignInPage';
import { AccountsOverviewPage } from '../../../src/ui/pages/AccountsOverviewPage';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';

let signInPage;
let accountsOverviewPage;

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);

  signInPage = new SignInPage(page);
  accountsOverviewPage = new AccountsOverviewPage(page);
});

test.describe('Log out tests', () => {
  test('User can log out', async () => {
    await accountsOverviewPage.assertLogOutLinkIsVisible();
    await accountsOverviewPage.clickLogOutLink();

    await signInPage.assertLogInButtonIsVisible();
  });
});
