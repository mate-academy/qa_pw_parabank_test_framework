import { test } from '../../../_fixtures/fixtures';

import {
  EMPTY_FIRST_NAME_MESSAGE,
  EMPTY_LAST_NAME_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIP_CODE_MESSAGE,
  EMPTY_SSN_MESSAGE,
  EMPTY_USERNAME_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  EMPTY_CONFIRM_PASSWORD_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
  EXISTING_USERNAME_MESSAGE,
} from '../../../../src/ui/constants/registerErrorMessages';

test.describe('Register negative tests', () => {
  test('Register with empty required fields', async ({ registerPage }) => {
    await registerPage.open();

    await registerPage.clickRegisterButton();

    await registerPage.assertRequiredFieldErrorsAreVisible();
  });

  test('Register without first name', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillUsernameInput(user.username);
    await registerPage.fillPasswordInput(user.password);
    await registerPage.fillConfirmPasswordInput(user.password);

    await registerPage.clickRegisterButton();

    await registerPage.assertFirstNameErrorContainsText(
      EMPTY_FIRST_NAME_MESSAGE,
    );
  });

  test('Register without city', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillUsernameInput(user.username);
    await registerPage.fillPasswordInput(user.password);
    await registerPage.fillConfirmPasswordInput(user.password);

    await registerPage.clickRegisterButton();

    await registerPage.assertCityErrorContainsText(EMPTY_CITY_MESSAGE);
  });

  test('Register without state', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillUsernameInput(user.username);
    await registerPage.fillPasswordInput(user.password);
    await registerPage.fillConfirmPasswordInput(user.password);

    await registerPage.clickRegisterButton();

    await registerPage.assertStateErrorContainsText(EMPTY_STATE_MESSAGE);
  });

  test('Register without zip code', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillUsernameInput(user.username);
    await registerPage.fillPasswordInput(user.password);
    await registerPage.fillConfirmPasswordInput(user.password);

    await registerPage.clickRegisterButton();

    await registerPage.assertZipCodeErrorContainsText(EMPTY_ZIP_CODE_MESSAGE);
  });

  test('Register without password', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillUsernameInput(user.username);

    await registerPage.clickRegisterButton();

    await registerPage.assertPasswordErrorContainsText(EMPTY_PASSWORD_MESSAGE);
  });

  test('Register without password confirmation', async ({
    user,
    registerPage,
  }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillUsernameInput(user.username);
    await registerPage.fillPasswordInput(user.password);

    await registerPage.clickRegisterButton();

    await registerPage.assertConfirmPasswordErrorContainsText(
      EMPTY_CONFIRM_PASSWORD_MESSAGE,
    );
  });

  test('Register without last name', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillUsernameInput(user.username);
    await registerPage.fillPasswordInput(user.password);
    await registerPage.fillConfirmPasswordInput(user.password);

    await registerPage.clickRegisterButton();

    await registerPage.assertLastNameErrorContainsText(EMPTY_LAST_NAME_MESSAGE);
  });

  test('Register without address', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillUsernameInput(user.username);
    await registerPage.fillPasswordInput(user.password);
    await registerPage.fillConfirmPasswordInput(user.password);

    await registerPage.clickRegisterButton();

    await registerPage.assertAddressErrorContainsText(EMPTY_ADDRESS_MESSAGE);
  });

  test('Register without SSN', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillUsernameInput(user.username);
    await registerPage.fillPasswordInput(user.password);
    await registerPage.fillConfirmPasswordInput(user.password);

    await registerPage.clickRegisterButton();

    await registerPage.assertSsnErrorContainsText(EMPTY_SSN_MESSAGE);
  });

  test('Register without username', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillPasswordInput(user.password);
    await registerPage.fillConfirmPasswordInput(user.password);

    await registerPage.clickRegisterButton();

    await registerPage.assertUsernameErrorContainsText(EMPTY_USERNAME_MESSAGE);
  });

  test('Register with mismatched passwords', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillPhoneNumberInput(user.phoneNumber);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillUsernameInput(user.username);
    await registerPage.fillPasswordInput(user.password);

    await registerPage.fillConfirmPasswordInput(`${user.password}123`);

    await registerPage.clickRegisterButton();

    await registerPage.assertPasswordMismatchErrorContainsText(
      PASSWORD_MISMATCH_MESSAGE,
    );
  });
});
