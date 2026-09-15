import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { invalidSearchCriteria } from '../../../src/common/testData/findTransactionData';

test.beforeEach(async ({ createdAccount }) => {
  void createdAccount;
  await allure.severity('normal');
});

test.describe('Find Transactions with invalid data', () => {
  for (const criteria of invalidSearchCriteria) {
    const { name, fields, button, error, message } = criteria;

    test(`User cannot find transactions with ${name}`, async ({
      findTransactionsPage,
      createdAccount,
    }) => {
      await findTransactionsPage.goToFindTransactions();
      await findTransactionsPage.selectAccount(createdAccount);
      await findTransactionsPage.fillSearchFields(fields);
      await findTransactionsPage.clickFindTransactions(button);
      await findTransactionsPage.verifyFieldErrorMessage(error, message);
    });
  }
});
