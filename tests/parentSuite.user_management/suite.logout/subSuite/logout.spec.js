import { test } from '../../../fixtures/fixturesUser';

test.describe('Logout Functionality', () => {

  test('User can log out successfully', async ({ userActions }) => {
    await userActions.logout();
  });

});
