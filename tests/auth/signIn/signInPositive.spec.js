import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Sign in with valid credentials', async ({
  registeredCustomer,
  signInPage,
  accountServicesNavPage,
}) => {
  await allure.severity(Severity.CRITICAL);

  await accountServicesNavPage.clickLogOutLink();

  await signInPage.open();

  await signInPage.fillUsernameField(registeredCustomer.username);
  await signInPage.fillPasswordField(registeredCustomer.password);
  await signInPage.clickLogInButton();

  await accountServicesNavPage.assertLogOutLinkIsVisible();
});
