import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { testStep } from '../../../src/common/helpers/pwHelpers';

test.describe('Account Details tests', () => {
  test('View account details and activity', async ({
    page,
    user,
    accountsOverviewPage,
    accountDetailsPage,
  }) => {
    await allure.severity('critical');

    await registerUser(page, user);

    await accountsOverviewPage.open();
    await accountsOverviewPage.assertAccountsOverviewVisible();
    await accountsOverviewPage.assertAccountExists();

    await testStep('Open first account', async () => {
      await accountsOverviewPage.accountLinks.first().click();
    });

    await accountDetailsPage.assertAccountDetailsVisible();
    await accountDetailsPage.assertAccountActivityVisible();
  });
});
