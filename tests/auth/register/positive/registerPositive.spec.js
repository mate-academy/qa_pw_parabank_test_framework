import { test } from '../../../_fixtures/fixtures';

test.describe('Register positive tests', () => {
  test('Register with required fields', async ({ user, registerPage }) => {
    await registerPage.open();

    await registerPage.fillFirstNameInput(user.firstName);
    await registerPage.fillLastNameInput(user.lastName);
    await registerPage.fillAddressInput(user.address);
    await registerPage.fillCityInput(user.city);
    await registerPage.fillStateInput(user.state);
    await registerPage.fillZipCodeInput(user.zipCode);
    await registerPage.fillSsnInput(user.ssn);
    await registerPage.fillUsernameInput(user.username);
    await registerPage.fillPasswordInput(user.password);
    await registerPage.fillConfirmPasswordInput(user.password);
    await registerPage.clickRegisterButton();

    await registerPage.assertRegistrationSuccessMessageIsVisible();
  });

  test('Register with required and optional fields', async ({
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
    await registerPage.fillConfirmPasswordInput(user.password);
    await registerPage.clickRegisterButton();

    await registerPage.assertRegistrationSuccessMessageIsVisible();
  });
});
