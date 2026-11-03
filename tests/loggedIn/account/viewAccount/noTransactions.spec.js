import { test } from '../../../_fixtures/fixtures';

test.describe('Account without transactions', () => {
  test('Transaction table is hidden and No transactions found is shown', async ({
    registeredUser,
    accountDetailsActivityPage,
  }) => {
    const accountDetails = accountDetailsActivityPage(registeredUser.accountId);

    await accountDetails.open();
    await accountDetails.assertNoTransactions();
  });
});
