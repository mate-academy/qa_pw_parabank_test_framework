import { testStep } from '../../../common/helpers/pwHelpers';
import { RegisterPage } from '../../pages/auth/RegisterPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { MainPage } from '../../pages/MainPage';

export async function registerAndLoginUser(page, userData, userId = 0, logger = null) {
  await testStep(
    'Register and login user',
    async () => {
      const registerPage = new RegisterPage(page, userId, logger);
      const loginPage = new LoginPage(page, userId, logger);
      const mainPage = new MainPage(page, userId, logger);

      await registerPage.open();
      await registerPage.fillRegistrationForm(userData);
      await registerPage.clickRegisterButton();

      await mainPage.logout();

      await loginPage.open();
      await loginPage.fillUsernameInput(userData.username);
      await loginPage.fillPasswordInput(userData.password);
      await loginPage.clickLoginButton();
    },
    userId,
  );
}
