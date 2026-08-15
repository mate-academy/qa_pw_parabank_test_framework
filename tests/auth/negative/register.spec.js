import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { fillRegistrationForm } from '../../../src/ui/actions/auth/register';
import { REGISTRATION_REQUIRED_FIELD_ERRORS } from '../../../src/common/constants/auth/authMessages';

for (const [field, expectedError] of Object.entries(
  REGISTRATION_REQUIRED_FIELD_ERRORS,
)) {
  test(`should not register with empty ${field}`, async ({
    registerPage,
    user,
  }) => {
    await allure.severity('normal');

    await registerPage.openAndAssert();

    await fillRegistrationForm(registerPage, {
      ...user,
      [field]: '',
    });
    await registerPage.clickRegisterButton();

    await registerPage.assertFieldError(expectedError);
  });
}
