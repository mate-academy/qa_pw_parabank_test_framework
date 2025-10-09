import { test } from '../../../fixtures/fixturesAccount';

test.describe('Transfer Funds', () => {

  test('Transfer funds between accounts', async ({ accountActions, transferData }) => {
    for (const transfer of transferData) {
      await accountActions.transferFunds(transfer.from, transfer.to, transfer.amount);
    }
  });

});
