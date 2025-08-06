import { testStep } from '../../../common/helpers/pwHelpers';
import { SignUpPage } from '../../pages/auth/SignUpPage';
import { CustomerInfoForm } from '../../forms/CustomerInfoForm';

export async function signUpUser(page, user, userId = 0) {
  await testStep(
    `Sign up user`,
    async () => {
      const signUpPage = new SignUpPage(page, userId);
      const customerInfoForm = new CustomerInfoForm(page, userId);

      await signUpPage.open();
      await customerInfoForm.submitRegisterForm(user);

      await signUpPage.assertSignUpIsSuccessful(user);
    },
    userId,
  );
}
