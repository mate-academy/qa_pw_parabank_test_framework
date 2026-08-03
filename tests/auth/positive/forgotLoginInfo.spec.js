import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import { fillCustomerLookupForm } from '../../../src/ui/actions/auth/lookup';

test.beforeEach(async ({ registerPage, registrationData }) => {
  await registerNewUser(registerPage, registrationData);
});

test('should find login info with valid registered customer data', async ({
  registrationData,
  customerLookupPage,
}) => {
  await allure.severity('critical');

  await customerLookupPage.open();

  await customerLookupPage.assertOpened();

  await fillCustomerLookupForm(customerLookupPage, registrationData);
  await customerLookupPage.clickFindMyLoginInfoButton();

  await customerLookupPage.assertLoginInfoFound(
    registrationData.username,
    registrationData.password,
  );
});
