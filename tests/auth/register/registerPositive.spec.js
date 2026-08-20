import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Register with valid data', async ({ customer, registerPage }) => {
  await allure.severity(Severity.CRITICAL);

  await registerPage.open();
  await registerPage.submitRegistrationForm(customer);

  await registerPage.assertRegistrationSuccessMessageIsVisible();
});
