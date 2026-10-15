
import { test } from '../../_fixtures/fixtures';
import { expect, testStep } from '../../../src/common/helpers/pwHelpers';
import * as allure from 'allure-js-commons';

test('Check access to Accounts Overview without login', async ({
  page,
}) => {
  await allure.severity('critical');

  await testStep('Open Accounts Overview without login', async () => {
    await page.goto('/parabank/overview.htm');
  });

  await testStep('Assert protected account data is not accessible',
     async () => {
    await expect(
      page.getByRole('link', { name: 'Log Out' }),
    ).not.toBeVisible();

    await expect(
      page.locator('#accountTable tbody tr'),
    ).toHaveCount(0);
  });
});
