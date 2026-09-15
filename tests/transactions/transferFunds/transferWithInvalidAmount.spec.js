import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { invalidTransferAmount } from '../../../src/common/testData/transferAmountData';
import { TRANSFER_ERROR_MESSAGE } from '../../../src/ui/constants/accountConstants';

test.beforeEach(async ({ createdAccount }) => {
  void createdAccount;
  await allure.severity('critical');
});

test.describe('Transfer with invalid amount', () => {
  for (const { name, value } of invalidTransferAmount) {
    test(`User cannot transfer funds with invalid amount: "${name}"`, async ({
      accountsOverviewPage,
      transferFundsPage,
      createdAccount,
    }) => {
      await accountsOverviewPage.goToAccountsOverview();

      const fromAccount = await accountsOverviewPage.getAccountNumber();

      await transferFundsPage.goToTransferFunds();
      await transferFundsPage.fillAmount(value);
      await transferFundsPage.selectFromAccount(fromAccount);
      await transferFundsPage.selectToAccount(createdAccount);
      await transferFundsPage.clickTransfer();
      await transferFundsPage.verifyErrorMessage(TRANSFER_ERROR_MESSAGE);
    });
  }
});
