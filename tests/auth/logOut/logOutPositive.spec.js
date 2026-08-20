import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Log out redirects to the login page', async ({
  registeredCustomer,
  accountServicesNavPage,
  signInPage,
}) => {
  await allure.severity(Severity.NORMAL);

  await accountServicesNavPage.clickLogOutLink();

  await signInPage.assertLoginFormIsVisible();
});
