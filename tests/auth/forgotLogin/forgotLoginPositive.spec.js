import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test('Recover login information successfully', async ({
  page,
  user,
  signInPage,
  forgotLoginPage,
}) => {
  await allure.severity('critical');

  await registerUser(page, user);

  await signInPage.logout();

  await forgotLoginPage.open();
  await forgotLoginPage.fillRecoveryForm(user);
  await forgotLoginPage.clickFindLoginInfoButton();

  await forgotLoginPage.assertRecoverySuccessful(user.username);
});
