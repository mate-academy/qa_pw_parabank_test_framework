import { test } from '../../_fixtures/fixtures';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import * as allure from 'allure-js-commons';

test('User can logout', async ({ homePage, registerPage }) => {
  await allure.severity('critical');

  const user = generateNewUserData();

  await homePage.open();
  await homePage.clickRegister();

  await registerPage.fillRegistrationForm(user);
  await registerPage.submitRegistration();

  await registerPage.verifyRegistrationSuccessful(user.username);
  await registerPage.clickLogout();
  await homePage.verifyLoggedOut();
});
