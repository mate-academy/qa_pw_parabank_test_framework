import { test, expect } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { createNewAccount } from '../../src/ui/actions/accountServices/createNewAccount';
import {
  searchTransactionById,
  searchTransactionByDate,
  searchTransactionByDateRange,
  searchTransactionByAmount,
} from '../../src/ui/actions/accountServices/searchTransactions';
import { ACCOUNT_TYPES, EPICS, FEATURES, SEVERITY } from '../../src/constants/index.js';
import { TEST_DATES } from '../../src/common/helpers/dateHelpers';
import { INVALID_NUMERIC_INPUTS } from '../../src/common/helpers/numberHelpers';

test.describe('Find Transactions Tests', () => {
  test('User can search transactions by transaction ID', async ({
    page,
    loggedInUser,
    findTransactionsPage,
    logger,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.FIND_TRANSACTIONS);
    await allure.story('User is able to search transactions by transaction ID');
    await allure.severity(SEVERITY.NORMAL);
    await allure.tag('positive', 'transactions', 'search');

    await createNewAccount(page, ACCOUNT_TYPES.SAVINGS, 0, logger);

    await findTransactionsPage.open();
    await searchTransactionById(findTransactionsPage, '12345');

    await findTransactionsPage.assertResultsDisplayed();
  });

  const searchTypes = [
    {
      name: 'date',
      action: async (findTransactionsPage) => {
        await searchTransactionByDate(findTransactionsPage, TEST_DATES.YEAR_START);
      },
    },
    {
      name: 'date range',
      action: async (findTransactionsPage) => {
        await searchTransactionByDateRange(
          findTransactionsPage,
          TEST_DATES.YEAR_START,
          TEST_DATES.YEAR_END,
        );
      },
    },
    {
      name: 'amount',
      action: async (findTransactionsPage) => {
        await searchTransactionByAmount(findTransactionsPage, '100');
      },
    },
  ];

  searchTypes.forEach(({ name, action }) => {
    test(`User can search transactions by ${name}`, async ({
      loggedInUser,
      findTransactionsPage,
    }) => {
      await allure.epic(EPICS.ACCOUNT_SERVICES);
      await allure.feature(FEATURES.FIND_TRANSACTIONS);
      await allure.story(`User is able to search transactions by ${name}`);
      await allure.severity(SEVERITY.NORMAL);
      await allure.tag('positive', 'transactions', 'search');

      await findTransactionsPage.open();
      await action(findTransactionsPage);

      await findTransactionsPage.assertResultsDisplayed();
    });
  });

  test.describe('Amount Search Validation', () => {
    INVALID_NUMERIC_INPUTS.forEach(({ value, description }) => {
      test(`User cannot search with ${description} amount`, async ({
        loggedInUser,
        findTransactionsPage,
      }) => {
        await allure.epic(EPICS.ACCOUNT_SERVICES);
        await allure.feature(FEATURES.FIND_TRANSACTIONS);
        await allure.story('User cannot search with invalid amount values');
        await allure.severity(SEVERITY.NORMAL);
        await allure.tag('negative', 'transactions', 'validation', 'parametrized');

        await findTransactionsPage.open();
        await searchTransactionByAmount(findTransactionsPage, value);

        await findTransactionsPage.assertErrorShown();
      });
    });
  });
});
