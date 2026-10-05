import { test } from "../../../_fixtures/fixtures";
import { severity, Severity } from 'allure-js-commons';


// eslint-disable-next-line max-len
test('Successful login with valid credentials', async ({ loggedOutUser, homePage }) => {
  await severity(Severity.CRITICAL);
  await homePage.open();
  await homePage.fillUsernameField(loggedOutUser.username);
  await homePage.fillPasswordField(loggedOutUser.password);
  await homePage.clickLogInButton();
  await homePage.assertLogOutLinkIsVisible();
});