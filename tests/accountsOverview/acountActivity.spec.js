import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { label, severity } from 'allure-js-commons';

test.describe('Account Activity', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  test('Filter account transactions by type shows results', async ({
    homePage,
    overviewPage,
  }) => {
    await label('parentSuite', 'Parabank');
    await label('suite', 'Account Overview');
    await label('subSuite', 'Account Activity');
    await severity('minor');

    await homePage.clickOverviewButton();
    await overviewPage.clickFirstAccountLink();

    await overviewPage.selectTransactionType('Credit');
    await overviewPage.clickGoButton();

    await overviewPage.assertTransactionTableVisible();
  });
});