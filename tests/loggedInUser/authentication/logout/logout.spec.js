import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

test('User can log out', async ({
  accountOverviewPage,
  loggedInUser,
  loginPage,
}) => {
  await allure.severity('critical');

  await accountOverviewPage.logout();
  await loginPage.assertLoginFormIsVisible();
});
