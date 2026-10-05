import { test } from "../../_fixtures/fixtures";
import { severity, Severity } from 'allure-js-commons';

test('Successful log out', async ({ existingUser, homePage }) => {
  await severity(Severity.CRITICAL);
  await homePage.assertLogOutLinkIsVisible();
  await homePage.clickLogOutLink();
  await homePage.assertLogInFormIsVisible();
});