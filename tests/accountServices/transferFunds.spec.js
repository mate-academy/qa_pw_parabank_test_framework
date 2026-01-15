import { test, expect } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { createNewAccount } from '../../src/ui/actions/accountServices/createNewAccount';
import { transferFundsBetweenAccounts } from '../../src/ui/actions/accountServices/transferFundsBetweenAccounts';
import { ACCOUNT_TYPES, EPICS, FEATURES, SEVERITY } from '../../src/constants/index.js';
import { INVALID_NUMERIC_INPUTS } from '../../src/common/helpers/numberHelpers';

test.describe('Transfer Funds Tests', () => {
  test('User can transfer funds between accounts', async ({
    page,
    loggedInUser,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.TRANSFER_FUNDS);
    await allure.story('User is able to transfer funds between accounts');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('positive', 'transfer', 'funds');

    await createNewAccount(page, ACCOUNT_TYPES.SAVINGS);

    await transferFundsBetweenAccounts(page, '100');
  });

  test('User cannot transfer without amount', async ({
    loggedInUser,
    transferFundsPage,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.TRANSFER_FUNDS);
    await allure.story('User cannot transfer without required amount');
    await allure.severity(SEVERITY.NORMAL);
    await allure.tag('negative', 'validation', 'transfer');

    await transferFundsPage.open();
    await transferFundsPage.clickTransferButton();

    await transferFundsPage.assertErrorMessageContainsText('amount');
  });

  test.describe('Amount Validation', () => {
    INVALID_NUMERIC_INPUTS.forEach(({ value, description }) => {
      test(`User cannot transfer with ${description} amount`, async ({
        loggedInUser,
        transferFundsPage,
      }) => {
        await allure.epic(EPICS.ACCOUNT_SERVICES);
        await allure.feature(FEATURES.TRANSFER_FUNDS);
        await allure.story('User cannot transfer with invalid amount values');
        await allure.severity(SEVERITY.NORMAL);
        await allure.tag('negative', 'validation', 'transfer');

        await transferFundsPage.open();
        await transferFundsPage.fillAmountInput(value);
        await transferFundsPage.clickTransferButton();

        await transferFundsPage.assertTransferFailedWithInvalidAmount(value);
      });
    });
  });
});
