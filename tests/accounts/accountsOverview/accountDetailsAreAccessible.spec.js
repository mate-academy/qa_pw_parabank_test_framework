import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test.beforeEach(async ({ registeredUser }) => {
  void registeredUser;
  await allure.severity('critical');
});

test('Accounts Overview table is displayed to registered user', async ({
  accountsOverviewPage,
}) => {
  await accountsOverviewPage.goToAccountsOverview();
  await accountsOverviewPage.verifyAccountOverviewTableDisplayed();

  const accountNumber = await accountsOverviewPage.getAccountNumber();
  const balance = await accountsOverviewPage.getAccountBalance();

  await accountsOverviewPage.clickAccount();
  await accountsOverviewPage.verifyAccountNumber(accountNumber);
  await accountsOverviewPage.verifyBalance(balance);
});
