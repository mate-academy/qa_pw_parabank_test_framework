import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

test('User can register with valid data', async ({
  registrationPage,
  registrationData,
}) => {
  await allure.severity('critical');

  await registrationPage.open();
  await registrationPage.fillRegistrationForm(registrationData);
  await registrationPage.submitRegistration();
  await registrationPage.assertRegistrationIsSuccessful(
    registrationData.username,
  );
});

test('User cannot register when passwords do not match', async ({
  registrationPage,
  registrationDataWithMismatchedPasswords,
}) => {
  await allure.severity('normal');

  await registrationPage.open();
  await registrationPage.fillRegistrationForm(
    registrationDataWithMismatchedPasswords,
  );
  await registrationPage.submitRegistration();
  await registrationPage.assertPasswordMismatchErrorIsVisible();
});
