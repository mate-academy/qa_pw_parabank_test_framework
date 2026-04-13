import { test } from '../_fixtures/fixtures';
import { registerUser } from '../../src/ui/actions/auth/registerUser';

test('User successful log out test', async ({ user, page, registrationPage, homePage }) => {
  await registerUser(page, user);
  await registrationPage.clickLogoutButton();
  await page.waitForURL('**/parabank/index.htm');
  await homePage.assertPageUrl('/parabank/index.htm');
});
