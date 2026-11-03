import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';

test.describe('Sign Up Positive', () => {
  test('User should be able to sign up with all fields filled', async ({ page, user }) => {
    await signUpUser(page, user);
  });

  test('User should be able to sign up with only required fields', async ({ page, user }) => {
    await signUpUser(page, { ...user, phone: '' });
  });
});