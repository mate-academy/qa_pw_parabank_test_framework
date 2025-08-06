import { test } from '../../_fixtures/fixtures';
import { INTERNAL_ERROR } from '../../../src/ui/constants/authMessages';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  {
    amount: '',
    title: 'Ammount is empty',
    message: INTERNAL_ERROR,
  },
  {
    amount: 'text',
    title: 'Ammount is wrong',
    message: INTERNAL_ERROR,
  },
];

test(`Transfer Funds with invalid data`, async ({
  page,
  transferFundsPage,
  accountServicesPanel,
  overviewPage,
  user,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

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

  for (const { amount, title, message } of testParameters) {
    await test.step(`- Trunsfer Funds when ${title}`, async () => {
      await accountServicesPanel.clickTransferFundsLink();
      await transferFundsPage.submitTransferFundsForm(amount);
      await transferFundsPage.assertErrorMessageContainsText(message);
    });
  }
});
