import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test(`Request Loan - Denied`, async ({
  page,
  requestLoanPage,
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

  const requestedAmmount = 100;
  const downPayment = parseInt(totalBalance.replace('$', '')) + 1;

  await test.step(
    `Request loan with bigger down payment (${downPayment}) ` +
      'than available balance',
    async () => {
      await accountServicesPanel.clickRequestLoanLink();
      await requestLoanPage.submitLoanForm(requestedAmmount, downPayment);
      await requestLoanPage.assertLoanRequestDenied();
      await requestLoanPage.assertResponseDateIsToday();
    },
  );

  // Check account summary
  await test.step('Verify that user has only one account number', async () => {
    await accountServicesPanel.clickAccountsOverviewLink();
    await overviewPage.assertCheckAccountAndBalance(accountRows, totalBalance);
  });
});
