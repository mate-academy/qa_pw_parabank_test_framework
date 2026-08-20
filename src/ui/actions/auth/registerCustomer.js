import { RegisterPage } from '../../pages/auth/RegisterPage';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function registerCustomer(page, customer, userId = 0) {
  await testStep(
    `Register user`,
    async () => {
      const registerPage = new RegisterPage(page, userId);

      await registerPage.open();
      await registerPage.submitRegistrationForm(customer);
      await registerPage.assertRegistrationSuccessMessageIsVisible();
    },
    userId,
  );
}
