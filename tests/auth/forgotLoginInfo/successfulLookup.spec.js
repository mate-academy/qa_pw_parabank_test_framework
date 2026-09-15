import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test.beforeEach(async ({ registeredUser, registerPage }) => {
  void registeredUser;
  await registerPage.clickLogout();
  await allure.severity('critical');
});

test('User can successfully look up login info', async ({
  homePage,
  forgotLoginInfoPage,
  registeredUser,
  lookupPage,
}) => {
  await homePage.open();
  await homePage.clickForgotLoginInfo();

  await forgotLoginInfoPage.fillLookupForm(registeredUser);
  await forgotLoginInfoPage.clickFindMyLoginInfo();
  await lookupPage.verifyUsername(registeredUser.username);
});
