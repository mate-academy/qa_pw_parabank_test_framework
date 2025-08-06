import { test } from '../../_fixtures/fixtures';
import { INTERNAL_ERROR } from '../../../src/ui/constants/authMessages';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test(`Transfer Funds - less than available funds on account`, async ({
  page,
  transferFundsPage,
  accountServicesPanel,
  overviewPage,
  user,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });
  testInfo.annotations.push({ type: 'issue', description: 'BUG-003' });

  // Create new user
  await signUpUser(page, user);

  let accountRows;
  let totalBalance;

  // Check account summary
  await test.step('Account overview and check balance summary', async () => {
    await accountServicesPanel.clickAccountsOverviewLink();
    accountRows = await overviewPage.getAllRowsData();
    totalBalance = await overviewPage.getTotalBalanceText();
  });

  const amount = 1_000_000;

  await test.step(`Trunsfer Funds when funds are not available`, async () => {
    await accountServicesPanel.clickTransferFundsLink();
    await transferFundsPage.submitTransferFundsForm(amount);
    await transferFundsPage.assertErrorMessageContainsText(INTERNAL_ERROR);
  });
});
