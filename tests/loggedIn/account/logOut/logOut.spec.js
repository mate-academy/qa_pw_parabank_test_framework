import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { logOut } from '../../../../src/ui/actions/auth/logOut';

test.describe('Log Out', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  test('User should be able to log out', async ({ page }) => {
    await logOut(page);
  });
});
