import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test('Sign in with valid credentials', async ({ page, user, signInPage }) => {
  await allure.severity('critical');

  await registerUser(page, user);

  await signInPage.logout();

  await signInPage.open();
  await signInPage.signIn(user.username, user.password);

  await signInPage.assertLoginSuccessful();
});
