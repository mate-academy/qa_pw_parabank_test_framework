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
  await accountsOverviewPage.verifyAccountOverviewColumns();
  await accountsOverviewPage.verifyBalanceDisplayed();
});
