import { test } from '../../_fixtures/fixtures';
import { GENERIC_SERVER_ERROR_MESSAGE } from '../../../src/ui/constants/genericMessages';
import * as allure from 'allure-js-commons';

const testParameters = [
  { scenario: 'is empty', amount: '' },
  { scenario: 'contains non-numeric chars', amount: 'abc' },
];

test.describe(`Transfer Funds negative tests`, () => {
  let fromAccountId;
  let toAccountId;
  let fromAccountBalance;
  let toAccountBalance;

  test.beforeEach(async ({ signedUpUserWithTwoAccounts }) => {
    const [fromAccount, toAccount] = signedUpUserWithTwoAccounts;
    fromAccountId = fromAccount.accountId;
    toAccountId = toAccount.accountId;
    fromAccountBalance = fromAccount.balance;
    toAccountBalance = toAccount.balance;
  });

  testParameters.forEach(({ scenario, amount }) => {
    test(`Shows error when 'Amount' input field ${scenario}`, async ({
      transferFundsPage,
      accountsOverviewPage,
    }) => {
      await allure.severity('normal');

      await transferFundsPage.open();
      await transferFundsPage.fillAmountField(amount);
      await transferFundsPage.selectFromAccountId(fromAccountId);
      await transferFundsPage.selectToAccountId(toAccountId);
      await transferFundsPage.clickTransferButton();

      // Note: Parabank shows generic error instead of client-side validation; product bug
      await transferFundsPage.assertErrorMessageHasText(
        GENERIC_SERVER_ERROR_MESSAGE,
      );

      await accountsOverviewPage.open();
      await accountsOverviewPage.assertAccountHasCorrectBalance(
        fromAccountId,
        fromAccountBalance,
      );
      await accountsOverviewPage.assertAccountHasCorrectBalance(
        toAccountId,
        toAccountBalance,
      );
    });
  });
});
