import { testStep } from '../../../common/helpers/pwHelpers';
import { SIGN_UP_SUCCESSFUL_REGISTRATION_MESSAGE } from '../../constants/authMessages';

export async function signUpUser(signUpPage, userData, userId = 0) {
  await testStep(
    `Sign up user`,
    async () => {
      await signUpPage.open();
      await signUpPage.fillForm(userData);
      await signUpPage.clickRegisterButton();
      await signUpPage.assertSuccessMessageContainsText(
        SIGN_UP_SUCCESSFUL_REGISTRATION_MESSAGE,
      );
    },
    userId,
  );
}
