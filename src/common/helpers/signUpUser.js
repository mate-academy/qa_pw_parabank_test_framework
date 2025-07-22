import { SignUpPage } from '../../ui/pages/signUpPage';
import { AccountOverviewPage } from '../../ui/pages/accountOverviewPage';
import { HomePage } from '../../ui/pages/homePage';
import { testStep } from '../helpers/pwHelpers';
import { WELCOME_TEXT } from '../../../src/common/test data/constants';

export async function signUpUser(page, user, userId = 0) {
  return await testStep(
    `Sign up user`,
    async () => {
      const signUpPage = new SignUpPage(page, userId);
      const homePage = new HomePage(page, userId);
      const accountOverviewPage = new AccountOverviewPage(page);

      await signUpPage.open();
      await signUpPage.submitSignUpForm(user);

      await homePage.assertWelcomeText(WELCOME_TEXT);

      const accountNumber = await accountOverviewPage.getAccountNumber();
      return accountNumber;
    },
    userId,
  );
}
