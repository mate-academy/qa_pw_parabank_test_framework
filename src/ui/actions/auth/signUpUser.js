import { SignUpPage } from '../../pages/auth/SignUpPage';

import { testStep } from '../../../common/helpers/pwHelpers';

export async function signUpUser(page, user, userId = 0) {
  await testStep(
    `Sign up user`,
    async () => {
      const signUpPage = new SignUpPage(page, userId);
      


      
      await signUpPage.open();
      await signUpPage.submitSignUpForm(user);
      await signUpPage.clickRegisterButton();

      await signUpPage.assertWelcomeUserHeadingIsVisible(user.username);
    },
    userId,
  );
}
