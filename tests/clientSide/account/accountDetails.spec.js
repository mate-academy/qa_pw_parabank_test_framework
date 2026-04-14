import { test } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { createNewAccount } from '../../../src/ui/actions/account/createNewAccount';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
  await createNewAccount(page, 'SAVINGS', user);
});
test('New account details test', async ({ openAccountPage, accountDetailsPage }) => {
  const newAccountId = await openAccountPage.getNewAccountId();
  await openAccountPage.clickNewAccountDetailsLink(newAccountId);
  await accountDetailsPage.assertPageUrl(newAccountId);
  await accountDetailsPage.assertAccountDetails({
    id: newAccountId,
    type: 'SAVINGS',
    balance: '$100.00',
    availableBalance: '$100.00'
  });
})
