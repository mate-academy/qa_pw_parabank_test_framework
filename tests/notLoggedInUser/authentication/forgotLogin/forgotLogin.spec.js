import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

test('User can recover valid login information', async ({
  forgotLoginPage,
  loginPage,
  registeredUser,
}) => {
  await allure.severity('critical');

  await loginPage.open();
  await loginPage.openForgotLoginInfoPage();
  await forgotLoginPage.fillCustomerInformation(registeredUser);
  await forgotLoginPage.submitCustomerLookup();
  await forgotLoginPage.assertLoginInformationIsDisplayed(registeredUser);
});

test('User cannot recover login information with unknown data', async ({
  forgotLoginPage,
  loginPage,
  registrationData,
}) => {
  await allure.severity('normal');

  await loginPage.open();
  await loginPage.openForgotLoginInfoPage();
  await forgotLoginPage.fillCustomerInformation(registrationData);
  await forgotLoginPage.submitCustomerLookup();
  await forgotLoginPage.assertCustomerWasNotFound();
});
