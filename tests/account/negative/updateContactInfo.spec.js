import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

test('should not show Update Profile page without being logged in', async ({
  updateContactInfoPage,
}) => {
  await allure.severity('normal');

  await updateContactInfoPage.open();

  await updateContactInfoPage.assertAccessDenied();
});
