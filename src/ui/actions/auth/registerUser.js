import { RegisterPage } from '../../pages/auth/RegisterPage';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function registerUser(page, user, userId = 0) {
  await testStep(
    'Register new user',
    async () => {
      const registerPage = new RegisterPage(page, userId);

      await registerPage.open();
      await registerPage.fillRegistrationForm(user);
      await registerPage.clickRegisterButton();
      await registerPage.assertRegistrationSuccessful(user.username);
    },
    userId,
  );
}
