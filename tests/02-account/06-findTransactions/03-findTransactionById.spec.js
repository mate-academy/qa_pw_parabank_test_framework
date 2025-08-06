import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let acountRows;
let accountsTransactions = [];

test(`Find transactions by Transaction ID`, async ({
  page,
  user,
  accountServicesPanel,
  findTransactionsPage,
  openNewAccountPage,
  overviewPage,
  accountDetailsPage,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });
  testInfo.annotations.push({ type: 'issue', description: 'BUG-005' });

  // Create new user
  await signUpUser(page, user);

  await test.step('Create a new account', async () => {
    await accountServicesPanel.clickOpenNewAccountLink();
    await openNewAccountPage.submitNewAccountForm();
    await accountServicesPanel.clickAccountsOverviewLink();
    acountRows = await overviewPage.getAllRowsData();
  });

  for (const row of acountRows) {
    const accountNumber = row.account;
    await test.step(`
      Get transaction data of account - ${accountNumber}`, async () => {
      await accountServicesPanel.clickAccountsOverviewLink();
      await overviewPage.clickAccountLinkByAccountText(accountNumber);
      const accountTransactions =
        await accountDetailsPage.getTransactionsData();
      accountsTransactions.push(accountTransactions[0]);
    });
  }

  for (const transaction of accountsTransactions) {
    const accountNumber = transaction.account;
    const accountId = transaction.transactionId;

    await test.step(`
      Find account ${accountNumber} transaction by ID`, async () => {
      await accountServicesPanel.clickFindTransactionsLink();
      await findTransactionsPage.selectFromAccount(accountNumber);
      await findTransactionsPage.submitFindTransactionsFormById(accountId);
      await accountDetailsPage.assertTransactionDataById(transaction);
    });
  }
});
