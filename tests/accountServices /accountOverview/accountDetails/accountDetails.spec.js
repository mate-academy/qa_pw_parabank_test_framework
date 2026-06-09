import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/signUpUser';
import { label, severity } from 'allure-js-commons';

test.describe('Account Details', () => {
  test.beforeEach(async ({ page, user }) => {
    await signUpUser(page, user);
  });

  test('Account details page shows correct account info', async ({
    homePage,
    accountOverviewPage,
  }) => {
    await label('parentSuite', 'Parabank');
    await label('suite', 'Account Services');
    await label('subSuite', 'Account Details');
    await severity('normal');

    await homePage.open();
    await homePage.clickAccountOverviewLink();

    const accountId = await accountOverviewPage.getFirstAccountId();
    await accountOverviewPage.clickFirstAccountLink();

    await accountOverviewPage.assertAccountIdValue(accountId);
    await accountOverviewPage.assertAccountType('CHECKING');
  });
});
