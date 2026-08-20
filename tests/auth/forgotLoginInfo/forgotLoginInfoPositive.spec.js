import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Forgot login info with valid customer data', async ({
  registeredCustomer,
  forgotLoginInfoPage,
}) => {
  await allure.severity(Severity.CRITICAL);

  await forgotLoginInfoPage.open();
  await forgotLoginInfoPage.submitLookupForm(registeredCustomer);

  await forgotLoginInfoPage.assertSuccessResult();
});
