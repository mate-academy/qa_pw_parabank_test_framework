import { testStep } from '../../../common/helpers/pwHelpers';
import { HomePage } from '../../pages/HomePage';
import { LoggedInPage } from '../../pages/loggedIn/LoggedInPage';

export async function signInUser(page, user, userId = 0) {
  await testStep(
    `Sign in user`,

    async () => {
      const homePage = new HomePage(page, userId);
      await homePage.open();
      await homePage.submitSignInForm(user);

      const loggedInPage = new LoggedInPage(page, userId);
      await loggedInPage.assertWelcomeMessageContainsUserName(user.firstName, user.lastName);
    },

    userId,
  );
}
