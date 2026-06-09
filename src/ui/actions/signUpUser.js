import { SignUpPage } from '../pages/auth/SignUpPage';
import { testStep } from '../../common/helpers/pwHelpers';

export async function signUpUser(page, user, userId = 0) {
  await testStep(
    `Sign up user`,
    async () => {
      const registerPage = new SignUpPage(page, userId);

      await registerPage.open();
      await registerPage.submitSignUpForm(user);
      await registerPage.assertWelcomeTextVisible(user.username);
      },
    userId,
  );
}
