import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

const TRANSFER_AMOUNT = '30.00';
const NEW_ACCOUNT_TYPE = 'SAVINGS';

test('User can find a transaction by amount and ID', async ({
  findTransactionsPage,
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

  await findTransactionsPage.open();
  await findTransactionsPage.findByAmount(fromAccountId, TRANSFER_AMOUNT);
  await findTransactionsPage.assertDebitTransactionIsDisplayed(TRANSFER_AMOUNT);

  const transactionId = await findTransactionsPage.getFirstTransactionId();

  await findTransactionsPage.open();
  await findTransactionsPage.findByTransactionId(fromAccountId, transactionId);
  await findTransactionsPage.assertTransactionIdIsDisplayed(transactionId);
});
