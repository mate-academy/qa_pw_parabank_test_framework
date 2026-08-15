import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import { fillLoginForm } from '../../../src/ui/actions/auth/login';
import { logout } from '../../../src/ui/actions/auth/logout';

test.beforeEach(async ({ page, user }) => {
  await registerNewUser(page, user);
  await logout(page);
});

test('should log in successfully with valid credentials', async ({
  homePage,
  accountsOverviewPage,
  user,
}) => {
  await allure.severity('critical');

  await homePage.assertOpened();

  await fillLoginForm(homePage, user);
  await homePage.clickLoginButton();

  await accountsOverviewPage.assertOpened();
  await accountsOverviewPage.assertWelcomeMessage(
    user.firstName,
    user.lastName,
  );
});
