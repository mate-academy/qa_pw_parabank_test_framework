import { testStep } from '../../../common/helpers/pwHelpers';
import { HomePage } from '../../pages/HomePage';
import { AccountServicesPanel } from '../../pages/AccountServicesPanel';

export async function logInUser(page, user, userId = 0) {
  await testStep(
    `Log In user`,
    async () => {
      const homePage = new HomePage(page, userId);
      const accountServicesPanel = new AccountServicesPanel(page, userId);

      await homePage.open();
      await homePage.submitLogInForm(user);
      await accountServicesPanel.assertWelcomeMessageIncludesUser(user);
    },
    userId,
  );
}
