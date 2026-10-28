import { test } from '../../_fixtures/fixtures';

import { TransferFundsPage } from '../../../src/ui/pages/TransferFundsPage';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { openNewAccount } from '../../../src/ui/actions/account/openNewAccount';

let transferFundsPage;
let fromAccountId;
let toAccountId;

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);

  await openNewAccount(pages[0], 'CHECKING');

  transferFundsPage = new TransferFundsPage(pages[0]);

  await transferFundsPage.clickTransferFundsLink();
  await transferFundsPage.assertTransferFundsTitleIsVisible();
  await transferFundsPage.assertAtLeastTwoAccountsAreAvailable();

  const accountIds = await transferFundsPage.getAccountIds();

  fromAccountId = accountIds[0];
  toAccountId = accountIds[1];
});

test.describe('Transfer Funds tests', () => {
  test('User can transfer funds between accounts', async () => {
    const amount = 100;

    await transferFundsPage.fillAmountInput(amount);
    await transferFundsPage.selectFromAccount(fromAccountId);
    await transferFundsPage.selectToAccount(toAccountId);

    await transferFundsPage.clickTransferButton();

    await transferFundsPage.assertTransferCompletedSuccessfully();
    await transferFundsPage.assertTransferredAmount(amount);
    await transferFundsPage.assertFromAccountId(fromAccountId);
    await transferFundsPage.assertToAccountId(toAccountId);
  });

  test('User can transfer amount greater than available balance', async () => {
    const amount = 1000;

    await transferFundsPage.fillAmountInput(amount);
    await transferFundsPage.selectFromAccount(fromAccountId);
    await transferFundsPage.selectToAccount(toAccountId);

    await transferFundsPage.clickTransferButton();

    await transferFundsPage.assertTransferCompletedSuccessfully();
    await transferFundsPage.assertTransferredAmount(amount);
    await transferFundsPage.assertFromAccountId(fromAccountId);
    await transferFundsPage.assertToAccountId(toAccountId);
  });
});
