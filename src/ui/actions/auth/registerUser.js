import { testStep } from '../../../common/helpers/pwHelpers';
import { RegisterPage } from '../../pages/auth/RegisterPage';

export async function registerUser(page, userData, userId = 0, logger = null) {
  await testStep(
    'Register new user',
    async () => {
      const registerPage = new RegisterPage(page, userId, logger);

      await registerPage.open();
      await registerPage.fillRegistrationForm(userData);
      await registerPage.clickRegisterButton();
      await registerPage.assertRegistrationSuccess();
    },
    userId,
  );
}
