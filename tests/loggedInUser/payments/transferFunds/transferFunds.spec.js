import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

const TRANSFER_AMOUNT = '10.00';
const NEW_ACCOUNT_TYPE = 'SAVINGS';

test('User can transfer funds between accounts', async ({
  loggedInUser,
  openNewAccountPage,
  transferFundsPage,
}) => {
  await allure.severity('critical');

  await openNewAccountPage.open();
  await openNewAccountPage.createAccount(NEW_ACCOUNT_TYPE);
  await openNewAccountPage.assertAccountWasOpened();

  await transferFundsPage.open();

  const { fromAccountId, toAccountId } =
    await transferFundsPage.transferBetweenDifferentAccounts(TRANSFER_AMOUNT);

  await transferFundsPage.assertTransferIsSuccessful(
    TRANSFER_AMOUNT,
    fromAccountId,
    toAccountId,
  );
});
