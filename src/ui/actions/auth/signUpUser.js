import { testStep } from '../../../common/helpers/pwHelpers';
import { RegisterPage } from '../../pages/auth/RegisterPage';
import { LoggedInPage } from '../../pages/loggedIn/LoggedInPage';
import { logOut } from './logOut';

export async function signUpUser(page, user, userId = 0) {
  await testStep(
    `Sign up user`,

    async () => {
      const registerPage = new RegisterPage(page, userId);
      // Сессия register.htm хранит уже отправленную форму. Без сброса следующий тест
      // снова упирается в ранее созданного пользователя.
      await page.context().clearCookies();
      await registerPage.open();
      await registerPage.submitSignUpForm(user);
      await registerPage.assertAccountCreated(user.username);

      const loggedInPage = new LoggedInPage(page, userId);
      await loggedInPage.assertWelcomeMessageContainsUserName(user.firstName, user.lastName);
    },

    userId,
  );
}

export async function signUpUserAndLogOut(page, user, userId = 0) {
  await signUpUser(page, user, userId);
  await logOut(page);
}
