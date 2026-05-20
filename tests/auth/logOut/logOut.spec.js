import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import * as allure from 'allure-js-commons';

test(`User logout test`, async ({
  signUpPage,
  userData,
  logOutPage,
  signInPage,
}) => {
  await allure.severity('normal');

  await signUpUser(signUpPage, userData);

  await logOutPage.clickLogOutButton();
  await signInPage.assertLoginFormIsVisible();
});
