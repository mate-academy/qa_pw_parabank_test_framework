import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let acountRows;
let accountsTransactions = [];

test(`Find transactions by Transaction Date`, async ({
  page,
  user,
  accountServicesPanel,
  findTransactionsPage,
  openNewAccountPage,
  overviewPage,
  accountDetailsPage,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

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
    await test.step(`
      Find account ${accountNumber} transaction by date`, async () => {
      await accountServicesPanel.clickFindTransactionsLink();
      await findTransactionsPage.selectFromAccount(accountNumber);
      await findTransactionsPage.submitFindTransactionsFormByDate(
        transaction.date,
      );
      await accountDetailsPage.assertTransactionDataById(transaction);
    });
  }
});
