import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.describe('Account Activity filter tests', () => {
  const filterCases = [
    {
      month: 'All',
      transactionType: 'All',
    },
    {
      month: 'All',
      transactionType: 'Credit',
    },
    {
      month: 'All',
      transactionType: 'Debit',
    },
  ];

  for (const filterCase of filterCases) {
    test(`Filter transactions by ${filterCase.month}
         / ${filterCase.transactionType}`, async ({
      page,
      user,
      accountsOverviewPage,
      accountDetailsPage,
    }) => {
      await allure.severity('normal');

      await registerUser(page, user);

      await accountsOverviewPage.open();
      await accountsOverviewPage.openFirstAccount();

      await accountDetailsPage.assertAccountActivityVisible();

      await accountDetailsPage.filterTransactions(
        filterCase.month,
        filterCase.transactionType,
      );

      await accountDetailsPage.assertSelectedFilters(
        filterCase.month,
        filterCase.transactionType,
      );
    });
  }
});
