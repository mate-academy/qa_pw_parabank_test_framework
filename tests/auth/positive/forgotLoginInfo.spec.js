import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import { fillCustomerLookupForm } from '../../../src/ui/actions/auth/lookup';

test.beforeEach(async ({ page, user }) => {
  await registerNewUser(page, user);
});

test('should find login info with valid registered customer data', async ({
  user,
  customerLookupPage,
}) => {
  await allure.severity('critical');

  await customerLookupPage.openAndAssert();

  await fillCustomerLookupForm(customerLookupPage, user);
  await customerLookupPage.clickFindMyLoginInfoButton();

  await customerLookupPage.assertLoginInfoFound(
    user.username,
    user.password,
  );
});
