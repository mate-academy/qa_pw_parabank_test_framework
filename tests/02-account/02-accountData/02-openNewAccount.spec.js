import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { ACCOUNT_TYPES as ORIGINAL_ACCOUNT_TYPES } from '../../../src/ui/constants/accountActions';

const ACCOUNT_TYPES = Object.fromEntries(
  Object.entries(ORIGINAL_ACCOUNT_TYPES).filter(([key]) => key !== 'loan'),
);

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test.describe('Open new accounts', () => {
  for (const key of Object.keys(ACCOUNT_TYPES)) {
    test(`Open new account with type ${key}`, async ({
      overviewPage,
      accountServicesPanel,
      openNewAccountPage,
      accountDetailsPage,
    }, testInfo) => {
      testInfo.annotations.push({ type: 'severity', description: 'minor' });

      let accountRows;
      let totalBalance;
      let newAccount;

      // Check account summary before create a new one
      await test.step('Account overview and summary', async () => {
        await accountServicesPanel.clickAccountsOverviewLink();
        totalBalance = await overviewPage.getTotalBalanceText();
        await overviewPage.assertTotalBalanceMatchesSum();
      });

      // Open new account
      await test.step('Create a new account', async () => {
        await accountServicesPanel.clickOpenNewAccountLink();
        await openNewAccountPage.submitNewAccountForm(key);
        newAccount = await openNewAccountPage.getNewAccountNumber();
      });

      // Check account details after adding a new one
      await test.step('Accounts overview and summary', async () => {
        await accountServicesPanel.clickAccountsOverviewLink();
        accountRows = await overviewPage.getAllRowsData();
        await overviewPage.assertTotalBalanceMatchesSum();
        await overviewPage.assertTotalBalanceCheck(totalBalance);
      });

      // Check new account details
      await test.step('Check New Account details and values', async () => {
        await overviewPage.clickAccountLinkByAccountText(newAccount);
        await accountDetailsPage.assertAccountDetailsIsCorrect(
          accountRows.find(item => item.account === newAccount),
        );
      });
    });
  }
});
