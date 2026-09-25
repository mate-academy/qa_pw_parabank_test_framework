import { test } from '../../_fixtures/fixtures';
import { SignUpPage } from '../../../src/ui/pages/auth/SignUpPage';

let client;

test.beforeEach(async ({ page, user }) => {
  client = user;
  const signUpPage = new SignUpPage(page);

  await signUpPage.open();
  await signUpPage.registerUser(client);
  await signUpPage.verifySuccessRegistration(user.username);
  await signUpPage.clickLogOut();
});

test('Successful `Sign in` flow test', async ({
  signInPage,
  accountsOverviewPage,
  user,
}) => {
  await signInPage.open();
  await signInPage.fillUsernameField(user.username);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickLogInButton();
  await accountsOverviewPage.assertAccountsOverviewIsVisible();
});
