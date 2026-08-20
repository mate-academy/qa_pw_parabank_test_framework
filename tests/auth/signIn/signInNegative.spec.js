import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Sign in with empty username and password', async ({ signInPage }) => {
  await allure.severity(Severity.NORMAL);

  await signInPage.open();

  await signInPage.clickLogInButton();

  await signInPage.assertErrorMessageHasText(
    'Please enter a username and password.',
  );
});
