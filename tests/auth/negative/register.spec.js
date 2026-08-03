import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { fillRegistrationForm } from '../../../src/ui/actions/auth/register';
import { REGISTRATION_REQUIRED_FIELD_ERRORS } from '../../../src/common/constants/authMessages';

for (const [field, expectedError] of Object.entries(
  REGISTRATION_REQUIRED_FIELD_ERRORS,
)) {
  test(`should not register with empty ${field}`, async ({
    registerPage,
    registrationData,
  }) => {
    await allure.severity('normal');

    await registerPage.open();

    await registerPage.assertOpened();

    await fillRegistrationForm(registerPage, {
      ...registrationData,
      [field]: '',
    });
    await registerPage.clickRegisterButton();

    await registerPage.assertFieldError(expectedError);
  });
}
