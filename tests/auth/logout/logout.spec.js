import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { LogOutPage } from '../../../src/ui/pages/auth/LogOutPage';

test.describe('Log Out tests', () => {
  test('User can log out successfully', async ({ page, user }) => {
    await allure.severity('critical');

    await registerUser(page, user);

    const logOutPage = new LogOutPage(page);

    await logOutPage.logOut();
    await logOutPage.assertUserLoggedOut();
  });

  test('User cannot access protected page after logout', async ({
    page,
    user,
  }) => {
    await allure.severity('critical');

    await registerUser(page, user);

    const logOutPage = new LogOutPage(page);

    await logOutPage.logOut();
    await logOutPage.assertUserLoggedOut();
    await logOutPage.assertProtectedPageRequiresLogin();
  });
});
