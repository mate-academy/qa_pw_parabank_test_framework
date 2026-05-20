import { test } from '../../_fixtures/fixtures';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import {
  SIGN_UP_FIRST_NAME_REQUIRED_ERROR_MESSAGE,
  SIGN_UP_LAST_NAME_REQUIRED_ERROR_MESSAGE,
  SIGN_UP_ADDRESS_REQUIRED_ERROR_MESSAGE,
  SIGN_UP_CITY_REQUIRED_ERROR_MESSAGE,
  SIGN_UP_STATE_REQUIRED_ERROR_MESSAGE,
  SIGN_UP_ZIP_CODE_REQUIRED_ERROR_MESSAGE,
  SIGN_UP_SSN_REQUIRED_ERROR_MESSAGE,
  SIGN_UP_USERNAME_REQUIRED_ERROR_MESSAGE,
  SIGN_UP_PASSWORD_REQUIRED_ERROR_MESSAGE,
  SIGN_UP_CONFIRM_PASSWORD_REQUIRED_ERROR_MESSAGE,
  SIGN_UP_PASSWORDS_MISMATCH_ERROR_MESSAGE,
  SIGN_UP_USERNAME_ALREADY_EXISTS_ERROR_MESSAGE,
} from '../../../src/ui/constants/authMessages';
import * as allure from 'allure-js-commons';

test(`Try to sign up with empty fields`, async ({ signUpPage }) => {
  await allure.severity('normal');

  await signUpPage.open();

  await signUpPage.clickRegisterButton();

  await signUpPage.assertErrorMessage(
    signUpPage.firstNameErrorMessage,
    SIGN_UP_FIRST_NAME_REQUIRED_ERROR_MESSAGE,
  );
  await signUpPage.assertErrorMessage(
    signUpPage.lastNameErrorMessage,
    SIGN_UP_LAST_NAME_REQUIRED_ERROR_MESSAGE,
  );
  await signUpPage.assertErrorMessage(
    signUpPage.addressErrorMessage,
    SIGN_UP_ADDRESS_REQUIRED_ERROR_MESSAGE,
  );
  await signUpPage.assertErrorMessage(
    signUpPage.cityErrorMessage,
    SIGN_UP_CITY_REQUIRED_ERROR_MESSAGE,
  );
  await signUpPage.assertErrorMessage(
    signUpPage.stateErrorMessage,
    SIGN_UP_STATE_REQUIRED_ERROR_MESSAGE,
  );
  await signUpPage.assertErrorMessage(
    signUpPage.zipCodeErrorMessage,
    SIGN_UP_ZIP_CODE_REQUIRED_ERROR_MESSAGE,
  );
  await signUpPage.assertErrorMessage(
    signUpPage.ssnErrorMessage,
    SIGN_UP_SSN_REQUIRED_ERROR_MESSAGE,
  );
  await signUpPage.assertErrorMessage(
    signUpPage.usernameErrorMessage,
    SIGN_UP_USERNAME_REQUIRED_ERROR_MESSAGE,
  );
  await signUpPage.assertErrorMessage(
    signUpPage.passwordErrorMessage,
    SIGN_UP_PASSWORD_REQUIRED_ERROR_MESSAGE,
  );
  await signUpPage.assertErrorMessage(
    signUpPage.confirmPasswordErrorMessage,
    SIGN_UP_CONFIRM_PASSWORD_REQUIRED_ERROR_MESSAGE,
  );
});

test(`Sign up with different confirm password`, async ({
  userData,
  signUpPage,
}) => {
  await allure.severity('normal');

  const confirmPassword = userData.password.slice(1);

  await signUpPage.open();

  await signUpPage.fillForm(userData, confirmPassword);
  await signUpPage.clickRegisterButton();

  await signUpPage.assertErrorMessage(
    signUpPage.confirmPasswordErrorMessage,
    SIGN_UP_PASSWORDS_MISMATCH_ERROR_MESSAGE,
  );
});

test(`Sign up with existing username`, async ({ userData, signUpPage }) => {
  await allure.severity('normal');

  await signUpPage.open();

  await signUpPage.fillForm(userData);
  await signUpPage.clickRegisterButton();

  await signUpPage.open();

  await signUpPage.fillForm(userData);
  await signUpPage.clickRegisterButton();

  await signUpPage.assertErrorMessage(
    signUpPage.usernameErrorMessage,
    SIGN_UP_USERNAME_ALREADY_EXISTS_ERROR_MESSAGE,
  );
});
