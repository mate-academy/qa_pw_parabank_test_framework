import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { fillCustomerLookupForm } from '../../../src/ui/actions/auth/lookup';
import { REGISTRATION_REQUIRED_FIELD_ERRORS } from '../../../src/common/constants/authMessages';

const { username, password, confirmPassword, ...lookupFieldErrors } =
  REGISTRATION_REQUIRED_FIELD_ERRORS;

for (const [field, expectedError] of Object.entries(lookupFieldErrors)) {
  test(`should not find login info with empty ${field}`, async ({
    customerLookupPage,
    registrationData,
  }) => {
    await allure.severity('normal');

    await customerLookupPage.open();

    await customerLookupPage.assertOpened();

    await fillCustomerLookupForm(customerLookupPage, {
      ...registrationData,
      [field]: '',
    });
    await customerLookupPage.clickFindMyLoginInfoButton();

    await customerLookupPage.assertFieldError(expectedError);
  });
}

test('should not find login info for a non-existent customer', async ({
  customerLookupPage,
  registrationData,
}) => {
  await allure.severity('normal');

  await customerLookupPage.open();

  await customerLookupPage.assertOpened();

  await fillCustomerLookupForm(customerLookupPage, registrationData);
  await customerLookupPage.clickFindMyLoginInfoButton();

  await customerLookupPage.assertNotFound();
});
