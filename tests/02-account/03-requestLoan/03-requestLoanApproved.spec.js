import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test(`Request Loan - Approved`, async ({
  page,
  requestLoanPage,
  accountServicesPanel,
  overviewPage,
  accountDetailsPage,
  user,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'critical' });

  // Create new user
  await signUpUser(page, user);

  let accountRows;
  let totalBalance;
  let newAccount;

  // Check account summary
  await test.step('Account overview and check balance summary', async () => {
    await accountServicesPanel.clickAccountsOverviewLink();
    totalBalance = await overviewPage.getTotalBalanceText();
  });

  const requestedAmmount = 100;
  const downPayment = 50;

  await test.step(
    `Request loan ${requestedAmmount} and down payment (${downPayment}). ` +
      'Get Account number',
    async () => {
      await accountServicesPanel.clickRequestLoanLink();
      await requestLoanPage.submitLoanForm(requestedAmmount, downPayment);
      await requestLoanPage.assertLoanRequestApproved();
      await requestLoanPage.assertResponseDateIsToday();
      newAccount = await requestLoanPage.getNewAccountNumber();
    },
  );

  // Check account details after adding a new one
  await test.step('Accounts overview and summary', async () => {
    await accountServicesPanel.clickAccountsOverviewLink();
    accountRows = await overviewPage.getAllRowsData();
    await overviewPage.assertTotalBalanceMatchesSum();
    await overviewPage.assertTotalBalanceCheck(
      totalBalance,
      requestedAmmount - downPayment,
    );
  });

  // Check new account details
  await test.step('Check New Account details and values', async () => {
    await overviewPage.clickAccountLinkByAccountText(newAccount);
    await accountDetailsPage.assertAccountDetailsIsCorrect(
      accountRows.find(item => item.account === newAccount),
      'loan',
    );
  });
});
