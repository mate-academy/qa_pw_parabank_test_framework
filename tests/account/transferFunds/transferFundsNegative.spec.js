import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

const invalidAmounts = ['', 'abc'];

test.describe('Transfer Funds negative tests', () => {
  for (const amount of invalidAmounts) {
    test(`Transfer funds with invalid amount '${amount || 'empty'}'`, async ({
      registeredCustomer,
      accountServicesNavPage,
      accountOverviewPage,
      transferFundsPage,
    }) => {
      await allure.severity(Severity.NORMAL);

      await accountServicesNavPage.clickAccountsOverview();
      const accountId = await accountOverviewPage.getFirstAccountId();

      await accountServicesNavPage.clickTransferFunds();
      await transferFundsPage.transferFunds(amount, accountId, accountId);

      await transferFundsPage.assertErrorMessage();
    });
  }
});
