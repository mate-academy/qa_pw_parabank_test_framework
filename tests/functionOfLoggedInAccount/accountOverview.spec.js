import { test } from '../_fixtures/fixtures';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';

let client;

test.beforeEach(async ({ page, user }) => {
  client = user;
  const signUpPage = new SignUpPage(page);

  await signUpPage.open();
  await signUpPage.registerUser(client);
  await signUpPage.verifySuccessRegistration(user.username);
});

test('Account Overview', async ({ signUpPage, accountsOverviewPage }) => {
  await signUpPage.clickAccountsOverviewLink();

  await accountsOverviewPage.assertAccountsOverviewIsVisible();
  await accountsOverviewPage.assertAccountColumnIsVisible();
  await accountsOverviewPage.assertBalanceColumnIsVisible();
  await accountsOverviewPage.assertAvailableAmountColumnIsVisible();
});
