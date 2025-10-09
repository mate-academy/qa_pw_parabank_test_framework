import { test } from '../../../fixtures/fixturesAuth';

test.describe('Forgot Login Flow', () => {

  test('Recover login info for existing user', async ({ authActions, validUser }) => {
    await authActions.forgotLogin(validUser.firstName, validUser.lastName, validUser.zip);
  });

});
