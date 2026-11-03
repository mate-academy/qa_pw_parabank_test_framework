import { test } from '../../../_fixtures/fixtures';
import {
  DATA_ACCESS_MODES,
  restoreJdbcAccessMode,
  setDataAccessMode,
} from '../../../../src/ui/actions/admin/setDataAccessMode';
import { signInUser } from '../../../../src/ui/actions/auth/singInUser';
import { signUpUserAndLogOut } from '../../../../src/ui/actions/auth/signUpUser';

test.describe('Sign In Positive', () => {
  DATA_ACCESS_MODES.forEach(mode => {
    test(`User should be able to sign in with ${mode.name} data access mode`, async ({
      page,
      user,
    }) => {
      await setDataAccessMode(page, mode);
      await signUpUserAndLogOut(page, user);
      await signInUser(page, user);
    });
  });

  test.afterAll(async ({ browser }) => {
    await restoreJdbcAccessMode(browser);
  });
});
