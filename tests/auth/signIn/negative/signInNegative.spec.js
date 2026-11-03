import { test } from '../../../_fixtures/fixtures';
import {
  DATA_ACCESS_MODES,
  restoreJdbcAccessMode,
  setDataAccessMode,
} from '../../../../src/ui/actions/admin/setDataAccessMode';
import { signUpUserAndLogOut } from '../../../../src/ui/actions/auth/signUpUser';

test.describe('Sign In Negative', () => {
  test.describe('Sign In with empty fields', () => {
    [
      { name: 'an empty username', credentials: user => ({ ...user, username: '' }) },
      { name: 'an empty password', credentials: user => ({ ...user, password: '' }) },
      {
        name: 'empty username and password',
        credentials: () => ({ username: '', password: '' }),
      },
    ].forEach(({ name, credentials }) => {
      test(`User should not be able to sign in with ${name}`, async ({
        homePage,
        loginPage,
        user,
      }) => {
        await homePage.open();
        await homePage.submitSignInForm(credentials(user));
        await loginPage.assertEmptyCredentials();
      });
    });
  });

  test.describe('Sign In with invalid credentials', () => {
    DATA_ACCESS_MODES.forEach(mode => {
      test(`User should not be able to sign in with an unknown username in ${mode.name} mode`, async ({
        page,
        homePage,
        loginPage,
        user,
      }) => {
        await setDataAccessMode(page, mode);
        await homePage.open();
        await homePage.submitSignInForm({
          ...user,
          username: `zz${user.username}`.slice(0, 20),
        });
        await loginPage.assertInvalidCredentials();
      });

      test(`User should not be able to sign in with a wrong password in ${mode.name} mode`, async ({
        page,
        homePage,
        loginPage,
        user,
      }) => {
        await setDataAccessMode(page, mode);
        await signUpUserAndLogOut(page, user);
        await homePage.open();
        await homePage.submitSignInForm({
          ...user,
          password: `${user.password}x`,
        });
        await loginPage.assertInvalidCredentials();
      });
    });
  });

  test.afterAll(async ({ browser }) => {
    await restoreJdbcAccessMode(browser);
  });
});
