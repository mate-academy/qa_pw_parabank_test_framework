import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import { logout } from '../../../src/ui/actions/auth/logout';

test('should return to the login page after logging out', async ({
  page,
  user,
  homePage,
}) => {
  await allure.severity('normal');

  await registerNewUser(page, user);

  await logout(page);

  await homePage.assertOpened();
});
