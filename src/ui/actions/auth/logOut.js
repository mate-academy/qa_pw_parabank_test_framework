import { testStep } from '../../../common/helpers/pwHelpers';
import { LoggedInPage } from '../../pages/loggedIn/LoggedInPage';

export async function logOut(page, userId = 0) {
  await testStep(
    'Log out',
    async () => {
      const loggedInPage = new LoggedInPage(page, userId);
      await loggedInPage.logOut();
      await loggedInPage.assertLoggedOut();
    },
    userId,
  );
}
