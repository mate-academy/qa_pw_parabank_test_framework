import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test('should not show account data without being logged in', async ({
  accountsOverviewPage,
}) => {
  await allure.severity('normal');

  await accountsOverviewPage.open();

  await accountsOverviewPage.assertAccessDenied();
});
