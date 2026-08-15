import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import { getDefaultAccountNumber } from '../../../src/ui/interfaces/account';
import { openNewAccounts } from '../../../src/ui/actions/account/openNewAccount';
import { ACCOUNT_TYPE } from '../../../src/ui/pages/account/OpenNewAccountPage';

// Just needs to exceed the default account's $100 starting balance.
const EXCESSIVE_AMOUNT = 1000;

test('should not transfer more funds than the source account holds', async ({
  page,
  user,
  accountsOverviewPage,
  openNewAccountPage,
  transferFundsPage,
}) => {
  // See KNOWN_ISSUES.md — BUG-2.
  test.fail();

  await allure.severity('normal');

  await registerNewUser(page, user);

  const defaultAccountNumber = await getDefaultAccountNumber(accountsOverviewPage);

  const [newAccountNumber] = await openNewAccounts(openNewAccountPage, [
    { accountType: ACCOUNT_TYPE.CHECKING, fromAccount: defaultAccountNumber },
  ]);

  await transferFundsPage.openAndAssert();

  await transferFundsPage.fillAmount(EXCESSIVE_AMOUNT);
  await transferFundsPage.selectFromAccount(defaultAccountNumber);
  await transferFundsPage.selectToAccount(newAccountNumber);

  const response = await transferFundsPage.clickTransferButtonAndCaptureResponse();

  await transferFundsPage.assertTransferResponseRejected(response);
});
