import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

test('User can view the account overview', async ({
  accountOverviewPage,
  loggedInUser,
}) => {
  await allure.severity('critical');

  await accountOverviewPage.open();
  await accountOverviewPage.assertAccountOverviewIsVisible();
  await accountOverviewPage.assertAccountSummaryIsDisplayed();
});
