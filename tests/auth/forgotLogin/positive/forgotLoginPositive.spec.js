import { test } from '../../../_fixtures/fixtures';
import { signUpUserAndLogOut } from '../../../../src/ui/actions/auth/signUpUser';
import { LoggedInPage } from '../../../../src/ui/pages/loggedIn/LoggedInPage';

test.describe('Forgot Login Positive', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUserAndLogOut(page, user);
  });

  test('User should be able to restore access to their account', async ({
    page,
    lookupPage,
    user,
  }) => {
    await lookupPage.open();
    await lookupPage.submitLookupForm(user);
    await lookupPage.assertCustomerFound(user.username, user.password);

    const loggedInPage = new LoggedInPage(page);
    await loggedInPage.assertWelcomeMessageContainsUserName(user.firstName, user.lastName);
  });
});
