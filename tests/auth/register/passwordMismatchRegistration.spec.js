import { test } from '../../_fixtures/fixtures';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { REGISTRATION_ERROR_MESSAGES } from '../../../src/ui/constants/registrationMessages';
import * as allure from 'allure-js-commons';

test('Register with passwords that do not match', async ({
  homePage,
  registerPage,
}) => {
  await allure.severity('critical');

  const user = generateNewUserData();
  let differentPassword = generateNewUserData().password;

  while (differentPassword === user.password) {
    differentPassword = generateNewUserData().password;
  }

  await homePage.open();
  await homePage.clickRegister();
  await registerPage.fillRegistrationForm(user);
  await registerPage.fillConfirmPassword(differentPassword);
  await registerPage.submitRegistration();
  await registerPage.verifyErrorMessage(
    REGISTRATION_ERROR_MESSAGES.passwordMismatch,
  );
});
