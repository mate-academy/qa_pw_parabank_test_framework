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
} from '../../../../src/ui/constants/authErrorMessages';


test.describe('Registration positive tests', () => {
  const SUCCESS_MESSAGE = 'Your account was created successfully. You are now logged in.';
  test('Registration with default user data', async ({ user, registrationPage }) => {
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
    await registrationPage.fillConfirmPasswordField(user.password);
    await registrationPage.clickRegisterButton();
    await registrationPage.assertWelcomeMessage(user.username);
    await registrationPage.assertSuccessMessage(SUCCESS_MESSAGE);
  });

  test('Registration without phone number', async ({ user, registrationPage }) => {
    await registrationPage.open();
    await registrationPage.fillFirstNameField(user.firstName);
    await registrationPage.fillLastNameField(user.lastName);
    await registrationPage.fillAddressField(user.address);
    await registrationPage.fillCityField(user.city);
    await registrationPage.fillStateField(user.state);
    await registrationPage.fillZipCodeField(user.zipCode);
    await registrationPage.fillSsnField(user.ssn);
    await registrationPage.fillUserNameField(user.username);
    await registrationPage.fillPasswordField(user.password);
    await registrationPage.fillConfirmPasswordField(user.password);
    await registrationPage.clickRegisterButton();
    await registrationPage.assertWelcomeMessage(user.username);
    await registrationPage.assertSuccessMessage(SUCCESS_MESSAGE);
  });
});