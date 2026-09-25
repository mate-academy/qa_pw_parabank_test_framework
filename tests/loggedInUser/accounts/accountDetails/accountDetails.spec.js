import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

const ALL_MONTHS = 'All';
const TRANSACTION_TYPES = ['Credit', 'Debit'];

test('User can view account details', async ({
  accountDetailsPage,
  accountOverviewPage,
  loggedInUser,
}) => {
  await allure.severity('critical');

  await accountOverviewPage.open();
  const accountNumber = await accountOverviewPage.openFirstAccountDetails();

  await accountDetailsPage.assertAccountDetailsAreDisplayed(accountNumber);
});

for (const transactionType of TRANSACTION_TYPES) {
  test(`User can filter ${transactionType} account activity`, async ({
    accountDetailsPage,
    accountOverviewPage,
    loggedInUser,
  }) => {
    await allure.severity('normal');

    await accountOverviewPage.open();
    await accountOverviewPage.openFirstAccountDetails();

    await accountDetailsPage.filterAccountActivity(ALL_MONTHS, transactionType);
    await accountDetailsPage.assertActivityFilterIsApplied(
      ALL_MONTHS,
      transactionType,
    );
  });
}
