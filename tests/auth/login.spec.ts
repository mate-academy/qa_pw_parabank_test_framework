import { test } from '@playwright/test';
import { LoginPage } from '../../src/ui/pages/auth/LoginPage';
import { validUser, invalidUsers } from '../_fixtures/user.fixture';

test.describe('Authentication - Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  for (const user of invalidUsers) {
    test(`Login with invalid credentials - ${user.username}`, async () => {
      await loginPage.signIn(user.username, user.password);
      await loginPage.assertLoginErrorVisible();
    });
  }

  test('Login with valid credentials', async () => {
    await loginPage.signIn(validUser.username, validUser.password);
    await loginPage.assertLoginSuccessful();
  });
});
