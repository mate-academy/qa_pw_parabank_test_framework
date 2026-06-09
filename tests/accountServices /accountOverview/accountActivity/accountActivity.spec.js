import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/signUpUser';
import { label, severity } from 'allure-js-commons';

test.describe('Account Activity', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  test('Filter account transactions by type shows results', async ({
    homePage,
    accountOverviewPage,
  }) => {
    await label('parentSuite', 'Parabank');
    await label('suite', 'Account Services');
    await label('subSuite', 'Account Activity');
    await severity('minor');

    await homePage.open();
    await homePage.clickAccountOverviewLink();
    await accountOverviewPage.clickFirstAccountLink();

    await accountOverviewPage.selectTransactionType('Credit');
    await accountOverviewPage.clickGoButton();

    await accountOverviewPage.assertTransactionTableVisible();
  });
});
