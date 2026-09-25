import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

test('Customer login form is displayed', async ({ loginPage }) => {
  await allure.severity('normal');

  await loginPage.open();
  await loginPage.assertLoginFormIsVisible();
});
