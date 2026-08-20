import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

const requiredFields = [
  { field: 'firstName', errorText: 'First name is required.' },
  { field: 'lastName', errorText: 'Last name is required.' },
  { field: 'street', errorText: 'Address is required.' },
  { field: 'city', errorText: 'City is required.' },
  { field: 'state', errorText: 'State is required.' },
  { field: 'zipCode', errorText: 'Zip Code is required.' },
];

test.describe('Update Contact Info negative test', () => {
  for (const { field, errorText } of requiredFields) {
    test(`Update Contact Info with empty ${field}`, async ({
      registeredCustomer,
      accountServicesNavPage,
      updateContactInfoPage,
    }) => {
      await allure.severity(Severity.NORMAL);

      const invalidCustomer = { ...registeredCustomer, [field]: '' };

      await accountServicesNavPage.clickUpdateContactInfo();

      await updateContactInfoPage.submitContactInfoForm(invalidCustomer);

      await updateContactInfoPage.assertFieldErrorIsVisible(field, errorText);
    });
  }
});
