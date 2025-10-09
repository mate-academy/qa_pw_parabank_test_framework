import { test } from '../../../fixtures/fixturesAuth';

test.describe('Register and Login Flow', () => {

  test('Register a new user successfully', async ({ authActions, validUser }) => {
    await authActions.registerUser(validUser);
  });

  test('Login with valid credentials', async ({ authActions, validUser }) => {
    await authActions.login(validUser.username, validUser.password);
  });
});
