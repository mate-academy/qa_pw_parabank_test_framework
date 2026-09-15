import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { TRANSACTION_TYPE } from '../../../src/ui/constants/accountConstants';

test.beforeEach(async ({ registeredUser }) => {
  void registeredUser;
  await allure.severity('normal');
});

test('User can change Accounts Transaction Type', async ({
  accountsOverviewPage,
}) => {
  await accountsOverviewPage.goToAccountsOverview();
  await accountsOverviewPage.clickAccount();
  await accountsOverviewPage.selectTransactionType(TRANSACTION_TYPE[2]);

  await accountsOverviewPage.verifySelectedTransactionType(TRANSACTION_TYPE[2]);

  await accountsOverviewPage.selectTransactionType(TRANSACTION_TYPE[0]);

  await accountsOverviewPage.verifySelectedTransactionType(TRANSACTION_TYPE[0]);
});
