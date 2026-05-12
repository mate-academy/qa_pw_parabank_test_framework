import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successful `Sign out` test', async ({ homePage }) => {
  await homePage.clickLogOutButton();
  await homePage.assertUserLoggedOut();
});
