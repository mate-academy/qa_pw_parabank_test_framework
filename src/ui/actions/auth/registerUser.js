import { RegistrationPage } from '../../pages/auth/RegistrationPage';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function registerUser(page, user, userId = 0) {
  await testStep(
    `Sign up user`,
    async () => {
      const registrationPage = new RegistrationPage(page, userId);

      await registrationPage.open();
      await registrationPage.fillRegistrationForm(user);
      await registrationPage.clickRegisterButton();
      await registrationPage.assertWelcomeMessage(user.username);
    },
    userId,
  );
}
