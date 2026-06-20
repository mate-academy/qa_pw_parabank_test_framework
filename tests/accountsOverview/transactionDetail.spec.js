import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { label, severity } from 'allure-js-commons';

test.describe('Account Details', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  test('Account details page shows correct account info', async ({
    homePage,
    overviewPage,
  }) => {
    await label('parentSuite', 'Parabank');
    await label('suite', 'Account Overview');
    await label('subSuite', 'Account Details');
    await severity('normal');

    await homePage.clickOverviewButton();

    const accountId = await overviewPage.getFirstAccountId();
    await overviewPage.clickFirstAccountLink();

    await overviewPage.assertAccountIdValue(accountId);
    await overviewPage.assertAccountType('CHECKING');
  });
});