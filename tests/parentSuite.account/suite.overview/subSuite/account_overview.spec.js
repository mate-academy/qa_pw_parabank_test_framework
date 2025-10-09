import { test } from '../../../fixtures/fixturesAccount';

test.describe('Account Overview', () => {

  test('View account overview', async ({ accountActions }) => {
    await accountActions.viewAccountOverview();
  });

  test('View account details and filter activity', async ({ accountActions }) => {
    const accountId = '12345'; // Example account ID
    await accountActions.viewAccountDetails(accountId);
  });

});
