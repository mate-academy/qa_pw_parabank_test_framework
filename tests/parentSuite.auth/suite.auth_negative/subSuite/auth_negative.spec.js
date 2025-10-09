import { test } from '../../../fixtures/fixturesAuth';

test.describe('Negative Login Scenarios', () => {

  test('Login with invalid username/password', async ({ authActions, invalidUser }) => {
    await authActions.loginNegative(invalidUser.username, invalidUser.password);
  });

});
