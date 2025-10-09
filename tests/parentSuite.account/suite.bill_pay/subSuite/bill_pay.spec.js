import { test } from '../../../fixtures/fixturesAccount';

test.describe('Bill Pay', () => {

  test('Pay a bill successfully', async ({ accountActions, billData }) => {
    await accountActions.payBill(billData);
  });

});
