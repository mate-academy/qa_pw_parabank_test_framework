import { test } from '../../../_fixtures/fixtures';

import { SignInPage } from '../../../../src/ui/pages/SignInPage';
import { AccountsOverviewPage } from '../../../../src/ui/pages/AccountsOverviewPage';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

let signInPage;
let accountsOverviewPage;

test.use({ contextsNumber: 2 });

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);

  signInPage = new SignInPage(pages[1]);
  accountsOverviewPage = new AccountsOverviewPage(pages[1]);
});

test('Successful `Sign in` flow test', async ({ user }) => {
  await signInPage.open();
  await signInPage.fillUsernameInput(user.username);
  await signInPage.fillPasswordInput(user.password);
  await signInPage.clickLogInButton();

  await accountsOverviewPage.assertAccountsOverviewTitleIsVisible();
});
