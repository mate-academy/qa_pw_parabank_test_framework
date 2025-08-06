import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { getFormatedDate } from '../../../src/common/helpers/dateFormater';
import { logInUser } from '../../../src/ui/actions/auth/logInUser';

let fakeTransaction = {
  account: '25110',
  date: getFormatedDate(-10),
  description: 'Fake Transfer Sent',
  transactionId: '31237',
  debit: '$31110.00',
  credit: null,
};
let sharedUser;

test.beforeEach(
  async ({ page, user, accountServicesPanel, openNewAccountPage }) => {
    if (!sharedUser) {
      await signUpUser(page, user);
      sharedUser = structuredClone(user);
      await test.step('Create a new account', async () => {
        await accountServicesPanel.clickOpenNewAccountLink();
        await openNewAccountPage.submitNewAccountForm();
      });
      await accountServicesPanel.clickLogOutButton();
    }
    await logInUser(page, sharedUser);
    await accountServicesPanel.clickFindTransactionsLink();
  },
);

test.describe('Find transactions by Fake Transaction Data', () => {
  test(`Find transactions by Fake Transaction Date`, async ({
    findTransactionsPage,
  }, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'minor' });
    await findTransactionsPage.submitFindTransactionsFormByDate(
      fakeTransaction.date,
    );
    await findTransactionsPage.assertNoTransactionInTable();
  });

  test(`Find transactions by Fake Transaction Date Range`, async ({
    findTransactionsPage,
  }, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'minor' });
    await findTransactionsPage.submitFindTransactionsFormByDateRange(
      fakeTransaction.date,
      getFormatedDate(-1),
    );
    await findTransactionsPage.assertNoTransactionInTable();
  });

  test(`Find transactions by Fake Transaction Amount`, async ({
    findTransactionsPage,
  }, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'minor' });
    await findTransactionsPage.submitFindTransactionsFormByAmount(
      fakeTransaction.amount,
    );
    await findTransactionsPage.assertNoTransactionInTable();
  });

  // eslint-disable-next-line playwright/no-skipped-test -- BUG-005
  test.skip(`Find transactions by Fake Transaction ID`, async ({
    findTransactionsPage,
  }, testInfo) => {
    testInfo.annotations.push({ type: 'severity', description: 'minor' });
    await findTransactionsPage.submitFindTransactionsFormByAmount(
      fakeTransaction.amount,
    );
    await findTransactionsPage.assertNoTransactionInTable();
  });
});
