import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import {
  ACCOUNT_TYPES,
  MONTH_NAMES,
  TRANSACTION_TYPES,
} from '../../../src/ui/constants/accountActions';

const checking = Object.keys(ACCOUNT_TYPES)[0];
let accountRows;

test.beforeEach(
  async ({
    page,
    user,
    accountServicesPanel,
    openNewAccountPage,
    overviewPage,
  }) => {
    await signUpUser(page, user);

    await test.step('Create a new account transactions', async () => {
      await accountServicesPanel.clickOpenNewAccountLink();
      await openNewAccountPage.submitNewAccountForm(checking);
      await accountServicesPanel.clickAccountsOverviewLink();
      accountRows = await overviewPage.getAllRowsData();
    });
  },
);

const now = new Date();
const currentMonthName = MONTH_NAMES[now.getMonth()];
const anotherMonthName = MONTH_NAMES.find(m => m !== currentMonthName);

const testParam = [
  { month: currentMonthName, transaction: TRANSACTION_TYPES[2] },
  { month: currentMonthName, transaction: TRANSACTION_TYPES[1] },
  { month: anotherMonthName, transaction: TRANSACTION_TYPES[2] },
  { month: anotherMonthName, transaction: TRANSACTION_TYPES[1] },
];

test(`Apply filters for existing account`, async ({
  overviewPage,
  accountDetailsPage,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

  const account = accountRows[0].account;

  await test.step('Open account and verify details', async () => {
    await overviewPage.clickAccountLinkByAccountText(account);
    await accountDetailsPage.assertAccountDetailsIsCorrect(
      accountRows.find(item => item.account === account),
    );
  });

  for (let i = 0; i < testParam.length; i++) {
    const { month, transaction } = testParam[i];
    await test.step(`Apply filter: ${month} & ${transaction}`, async () => {
      await accountDetailsPage.submitAccountActivityFilters(month, transaction);

      // eslint-disable-next-line playwright/no-conditional-in-test
      if (i === 0) {
        const transactionData = await accountDetailsPage.getTransactionsData();
        const dateString = transactionData[0].date;
        await accountDetailsPage.assertTransactionDateIsToday(dateString);
      } else {
        await accountDetailsPage.assertNoTransactionIsVisible();
      }
    });
  }
});
