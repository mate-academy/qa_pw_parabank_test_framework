import { test } from '../../../_fixtures/fixtures';
import {
  FIRST_NAME_ERROR_MESSAGE,
  LAST_NAME_ERROR_MESSAGE,
  ADDRESS_ERROR_MESSAGE,
  CITY_ERROR_MESSAGE,
  STATE_ERROR_MESSAGE,
  ZIP_CODE_ERROR_MESSAGE,
  SSN_ERROR_MESSAGE,
  USERNAME_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  CONFIRM_PASSWORD_ERROR_MESSAGE,
  PASSWORD_MISMATCH_ERROR_MESSAGE,
  USERNAME_ALREADY_EXISTS_ERROR_MESSAGE,
} from '../../../../src/ui/constants/authErrorMessages';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

test.describe('Registration negative tests', () => {
  test('Registration with empty fields error messages', async ({ registrationPage }) => {
    await registrationPage.open();
    await registrationPage.clickRegisterButton();

    await registrationPage.assertFirstNameErrorMessage(FIRST_NAME_ERROR_MESSAGE);
    await registrationPage.assertLastNameErrorMessage(LAST_NAME_ERROR_MESSAGE);
    await registrationPage.assertAddressErrorMessage(ADDRESS_ERROR_MESSAGE);
    await registrationPage.assertCityErrorMessage(CITY_ERROR_MESSAGE);
    await registrationPage.assertStateErrorMessage(STATE_ERROR_MESSAGE);
    await registrationPage.assertZipCodeErrorMessage(ZIP_CODE_ERROR_MESSAGE);
    await registrationPage.assertSsnErrorMessage(SSN_ERROR_MESSAGE);
    await registrationPage.assertUserNameErrorMessage(USERNAME_ERROR_MESSAGE);
    await registrationPage.assertPasswordErrorMessage(PASSWORD_ERROR_MESSAGE);
    await registrationPage.assertConfirmPasswordErrorMessage(CONFIRM_PASSWORD_ERROR_MESSAGE);
  });

  test('Registration with empty confirm password error messages', async ({ user, registrationPage }) => {
    await registrationPage.open();
    await registrationPage.fillFirstNameField(user.firstName);
    await registrationPage.fillLastNameField(user.lastName);
    await registrationPage.fillAddressField(user.address);
    await registrationPage.fillCityField(user.city);
    await registrationPage.fillStateField(user.state);
    await registrationPage.fillZipCodeField(user.zipCode);
    await registrationPage.fillPhoneField(user.phone);
    await registrationPage.fillSsnField(user.ssn);
    await registrationPage.fillUserNameField(user.username);
    await registrationPage.fillPasswordField(user.password);
    await registrationPage.clickRegisterButton();
    await registrationPage.assertConfirmPasswordErrorMessage(CONFIRM_PASSWORD_ERROR_MESSAGE);
  });

  test('Registration with invalid confirm password', async ({ user, registrationPage }) => {
    await registrationPage.open();
    await registrationPage.fillFirstNameField(user.firstName);
    await registrationPage.fillLastNameField(user.lastName);
    await registrationPage.fillAddressField(user.address);
    await registrationPage.fillCityField(user.city);
    await registrationPage.fillStateField(user.state);
    await registrationPage.fillZipCodeField(user.zipCode);
    await registrationPage.fillPhoneField(user.phone);
    await registrationPage.fillSsnField(user.ssn);
    await registrationPage.fillUserNameField(user.username);
    await registrationPage.fillPasswordField(user.password);
    await registrationPage.fillConfirmPasswordField(user.password + '1');
    await registrationPage.clickRegisterButton();
    await registrationPage.assertConfirmPasswordErrorMessage(PASSWORD_MISMATCH_ERROR_MESSAGE);
  });

  test('Registration with already existing username', async ({ page, user, registrationPage }) => {
  await registerUser(page, user);
  await registrationPage.clickLogoutButton();

  await registrationPage.open();
  await registrationPage.fillRegistrationForm(user);
  await registrationPage.clickRegisterButton();

  await registrationPage.assertUserNameErrorMessage(USERNAME_ALREADY_EXISTS_ERROR_MESSAGE);
});
});