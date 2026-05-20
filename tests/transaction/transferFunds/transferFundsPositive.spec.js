import { test } from '../../_fixtures/fixtures';
import { TRANSFER_FUNDS_SUCCESS_MESSAGE } from '../../../src/ui/constants/transactionMessages';
import {
  parseAmount,
  formatAmount,
} from '../../../src/common/helpers/currencyHelpers';
import * as allure from 'allure-js-commons';

const testParameters = [
  { amount: '50' },
  { amount: '100' },
  { amount: '500.50' },
];

test.describe(`Transfer Funds positive tests`, () => {
  let fromAccountId;
  let toAccountId;
  let fromAccountBalance;
  let toAccountBalance;

  test.beforeEach(async ({ signedUpUserWithTwoAccounts }) => {
    const [fromAccount, toAccount] = signedUpUserWithTwoAccounts;
    fromAccountId = fromAccount.accountId;
    toAccountId = toAccount.accountId;
    fromAccountBalance = parseAmount(fromAccount.balance);
    toAccountBalance = parseAmount(toAccount.balance);
  });

  testParameters.forEach(({ amount }) => {
    test(`Transfers funds between accounts with amount=${amount}`, async ({
      transferFundsPage,
      accountsOverviewPage,
    }) => {
      await allure.severity('blocker');

      await transferFundsPage.open();
      await transferFundsPage.fillAmountField(amount);
      await transferFundsPage.selectFromAccountId(fromAccountId);
      await transferFundsPage.selectToAccountId(toAccountId);
      await transferFundsPage.clickTransferButton();

      await transferFundsPage.assertTransferCompleteHeadingHasText(
        TRANSFER_FUNDS_SUCCESS_MESSAGE,
      );
      await transferFundsPage.assertAmountResultHasText(amount);
      await transferFundsPage.assertFromAccountIdResultHasText(fromAccountId);
      await transferFundsPage.assertToAccountIdResultHasText(toAccountId);

      await accountsOverviewPage.open();
      await accountsOverviewPage.assertAccountHasCorrectBalance(
        fromAccountId,
        formatAmount(fromAccountBalance - Number(amount)),
      );
      await accountsOverviewPage.assertAccountHasCorrectBalance(
        toAccountId,
        formatAmount(toAccountBalance + Number(amount)),
      );
    });
  });
});
