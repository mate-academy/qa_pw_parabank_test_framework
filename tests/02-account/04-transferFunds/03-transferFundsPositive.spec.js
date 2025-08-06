import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createNewAccount } from '../../../src/ui/actions/account/createNewAccount';

let accountRows;
let totalBalance;
let newAccountNumber;
let accountOne;
let accountTwo;
const amount = 100;

test(`Transfer Funds beetween 2 accounts`, async ({
  page,
  transferFundsPage,
  accountServicesPanel,
  overviewPage,
  user,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

  // Create new user
  await signUpUser(page, user);

  // Create new account
  ({ newAccountNumber, accountRows, totalBalance } = await createNewAccount(
    page,
    user,
  ));
  accountOne = accountRows[0].account;
  accountTwo = accountRows[1].account;

  await test.step(`Trunsfer Funds from one account to second`, async () => {
    await accountServicesPanel.clickTransferFundsLink();
    await transferFundsPage.submitTransferFundsForm(
      amount,
      accountOne,
      accountTwo,
    );
    await transferFundsPage.assertTransferConfirmationMessage(
      amount,
      accountOne,
      accountTwo,
    );
    await accountServicesPanel.clickAccountsOverviewLink();
    await overviewPage.assertTotalBalanceMatchesSum();
    await overviewPage.assertTotalBalanceCheck(totalBalance);
    const newAccountRows = await overviewPage.getAllRowsData();
    await overviewPage.assertCheckAmountDifference(
      accountRows,
      newAccountRows,
      amount,
      accountOne,
      accountTwo,
    );
  });
});
