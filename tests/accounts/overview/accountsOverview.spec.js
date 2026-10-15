import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.describe('Accounts Overview tests', () => {
  test('Display accounts overview for registered user', async ({
    page,
    user,
    accountsOverviewPage,
  }) => {
    await allure.severity('critical');

    await registerUser(page, user);

    await accountsOverviewPage.open();
    await accountsOverviewPage.assertAccountsOverviewVisible();
    await accountsOverviewPage.assertAccountExists();
    await accountsOverviewPage.assertTotalBalanceVisible();
  });
});
