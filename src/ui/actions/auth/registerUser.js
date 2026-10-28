import { RegisterPage } from '../../pages/RegisterPage';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function registerUser(page, user, userId = 0) {
  await testStep(
    `Register user`,
    async () => {
      const registerPage = new RegisterPage(page, userId);

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
    },
    userId,
  );
}
