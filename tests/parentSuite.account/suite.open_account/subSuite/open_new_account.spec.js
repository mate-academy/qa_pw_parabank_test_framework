import { test } from '../../../fixtures/fixturesAccount';

test.describe('Open New Account', () => {

  test('Open a new account successfully', async ({ accountActions }) => {
    await accountActions.openNewAccount('SAVINGS', '12345'); // type, fromAccount
  });

});
