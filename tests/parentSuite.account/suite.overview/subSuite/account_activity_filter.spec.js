import { test } from '../../../fixtures/fixturesAccount';

test.describe('Account Activity Filter', () => {

  test('Filter transactions by date range', async ({ accountActions }) => {
    await accountActions.openAccountActivity('12345');
    await accountActions.filterTransactions({
      fromDate: '01-01-2024',
      toDate: '12-31-2024'
    });
  });

  test('Filter transactions by type', async ({ accountActions }) => {
    await accountActions.openAccountActivity('12345');
    await accountActions.filterTransactions({
      type: 'Credit'
    });
  });

  test('Filter transactions by amount range', async ({ accountActions }) => {
    await accountActions.openAccountActivity('12345');
    await accountActions.filterTransactions({
      minAmount: 10,
      maxAmount: 500
    });
  });

});
