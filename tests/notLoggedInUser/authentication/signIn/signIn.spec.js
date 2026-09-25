import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

test('User can sign in with valid credentials', async ({
  accountOverviewPage,
  loginPage,
  registeredUser,
}) => {
  await allure.severity('critical');

  await loginPage.open();
  await loginPage.fillCredentials(
    registeredUser.username,
    registeredUser.password,
  );
  await loginPage.submitLogin();
  await accountOverviewPage.assertAccountOverviewIsVisible();
});

test('User cannot sign in with an incorrect password', async ({
  loginPage,
  registeredUser,
}) => {
  await allure.severity('critical');

  const incorrectPassword = `${registeredUser.password}invalid`;

  await loginPage.open();
  await loginPage.fillCredentials(registeredUser.username, incorrectPassword);
  await loginPage.submitLogin();
  await loginPage.assertInvalidCredentialsErrorIsVisible();
});
