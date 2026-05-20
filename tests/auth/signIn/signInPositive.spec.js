import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import * as allure from 'allure-js-commons';

test(`Sign In positive tests`, async ({
  signInPage,
  userData,
  logOutPage,
  signUpPage,
  accountsOverviewPage,
}) => {
  await allure.severity('critical');

  await signUpUser(signUpPage, userData);

  await logOutPage.clickLogOutButton();

  await signInPage.fillUsernameField(userData.username);
  await signInPage.fillPasswordField(userData.password);

  await signInPage.clickLogInButton();
  await accountsOverviewPage.assertWelcomeMessageShowsFullName(
    userData.firstName,
    userData.lastName,
  );
});
