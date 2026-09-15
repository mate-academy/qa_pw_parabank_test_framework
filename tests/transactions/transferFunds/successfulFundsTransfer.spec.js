import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { TRANSFER_AMOUNT } from '../../../src/ui/constants/accountConstants';

test.beforeEach(async ({ createdAccount }) => {
  void createdAccount;
  await allure.severity('critical');
});

test(`User can transfer funds within own accounts`, async ({
  accountsOverviewPage,
  transferFundsPage,
  createdAccount,
}) => {
  await accountsOverviewPage.goToAccountsOverview();

  const fromAccount = await accountsOverviewPage.getAccountNumber();

  await transferFundsPage.goToTransferFunds();
  await transferFundsPage.fillAmount(TRANSFER_AMOUNT);
  await transferFundsPage.selectFromAccount(fromAccount);
  await transferFundsPage.selectToAccount(createdAccount);
  await transferFundsPage.clickTransfer();
  await transferFundsPage.verifyTransferComplete(
    TRANSFER_AMOUNT,
    fromAccount,
    createdAccount,
  );
});
