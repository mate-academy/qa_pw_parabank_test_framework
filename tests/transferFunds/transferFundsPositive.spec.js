import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { openNewAccount } from '../../src/ui/actions/banking/openNewAccount';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  await openNewAccount(page, '1');
});

test('Successfully transfer funds between two accounts', async ({
  transferFundsPage,
}) => {
  await transferFundsPage.open();
  await transferFundsPage.fillAmountField(100);
  await transferFundsPage.clickTransferButton();
  await transferFundsPage.assertTransferComplete();
});
