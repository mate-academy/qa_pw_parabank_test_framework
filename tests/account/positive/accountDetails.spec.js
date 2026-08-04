import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import { openNewAccounts } from '../../../src/ui/actions/account/openNewAccount';
import { transferFunds } from '../../../src/ui/actions/account/transferFunds';
import { ACCOUNT_TYPE } from '../../../src/ui/pages/account/OpenNewAccountPage';

test.beforeEach(async ({ registerPage, registrationData }) => {
  await registerNewUser(registerPage, registrationData);
});

test('should show account details and filter activity by transaction type', async ({
  accountsOverviewPage,
  openNewAccountPage,
  transferFundsPage,
  accountDetailsPage,
}) => {
  await allure.severity('critical');

  await accountsOverviewPage.open();
  const defaultAccountNumber = await accountsOverviewPage
    .accountLink()
    .textContent();

  const [savingsAccountNumber] = await openNewAccounts(openNewAccountPage, [
    { accountType: ACCOUNT_TYPE.SAVINGS, fromAccount: defaultAccountNumber },
  ]);

  await transferFunds(transferFundsPage, [
    {
      amount: 50,
      fromAccount: savingsAccountNumber,
      toAccount: defaultAccountNumber,
    },
  ]);

  await accountDetailsPage.open(savingsAccountNumber);

  await accountDetailsPage.assertOpened();
  await accountDetailsPage.assertAccountNumber(savingsAccountNumber);
  await accountDetailsPage.assertAccountType('SAVINGS');

  await accountDetailsPage.assertActivityOpened();
  await accountDetailsPage.assertTransactionVisible('Funds Transfer Received');
  await accountDetailsPage.assertTransactionVisible('Funds Transfer Sent');

  await accountDetailsPage.selectTransactionType('Credit');
  await accountDetailsPage.clickGoButton();

  await accountDetailsPage.assertTransactionVisible('Funds Transfer Received');
  await accountDetailsPage.assertTransactionNotVisible('Funds Transfer Sent');

  await accountDetailsPage.selectTransactionType('Debit');
  await accountDetailsPage.clickGoButton();

  await accountDetailsPage.assertTransactionVisible('Funds Transfer Sent');
  await accountDetailsPage.assertTransactionNotVisible('Funds Transfer Received');
});
