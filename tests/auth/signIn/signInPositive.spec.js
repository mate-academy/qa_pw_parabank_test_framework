import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/signUpUser';
import { label, severity } from 'allure-js-commons';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successful `Sign in` flow test', async ({ user, homePage }) => {
  await label('parentSuite', 'Parabank');
  await label('suite', 'Auth');
  await label('subSuite', 'Sign In');
  await severity('critical');

  await homePage.open();
  await homePage.fillUsernameField(user.username);
  await homePage.fillPasswordField(user.password);
  await homePage.clickLoginButton();

  await homePage.assertWelcomeTextVisible(user.firstName, user.lastName);
});

