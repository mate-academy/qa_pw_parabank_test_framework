import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { fillRegistrationForm } from '../../../src/ui/actions/auth/register';

test('should register a new user with valid data', async ({
  registerPage,
  registrationData,
}) => {
  await allure.severity('critical');

  await registerPage.open();

  await registerPage.assertOpened();

  await fillRegistrationForm(registerPage, registrationData);
  await registerPage.clickRegisterButton();

  await registerPage.assertRegistrationSuccessful(registrationData.username);
});
