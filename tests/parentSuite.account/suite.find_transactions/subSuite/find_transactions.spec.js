import { test } from '../../../fixtures/fixturesAccount';

test.describe('Find Transactions', () => {

  test('Search for transactions by amount', async ({ accountActions }) => {
    const accountId = '12345';
    const amount = '50'; // example
    await accountActions.viewAccountDetails(accountId);
    await accountActions.searchTransactionsByAmount(amount);
  });

});
