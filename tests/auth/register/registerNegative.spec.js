import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';
import { generateNewCustomerData } from '../../../src/common/testData/generateNewCustomerData';

test.describe('Register negative tests', () => {
  const requiredFields = [
    {
      field: 'firstName',
      errorField: 'firstName',
      errorText: 'First name is required.',
    },
    {
      field: 'lastName',
      errorField: 'lastName',
      errorText: 'Last name is required.',
    },
    {
      field: 'street',
      errorField: 'address.street',
      errorText: 'Address is required.',
    },
    {
      field: 'city',
      errorField: 'address.city',
      errorText: 'City is required.',
    },
    {
      field: 'state',
      errorField: 'address.state',
      errorText: 'State is required.',
    },
    {
      field: 'zipCode',
      errorField: 'address.zipCode',
      errorText: 'Zip Code is required.',
    },
    {
      field: 'username',
      errorField: 'username',
      errorText: 'Username is required.',
    },
    {
      field: 'password',
      errorField: 'password',
      errorText: 'Password is required.',
    },
  ];

  for (const { field, errorField, errorText } of requiredFields) {
    test(`Register with empty ${field}`, async ({ customer, registerPage }) => {
      await allure.severity(Severity.NORMAL);

      const invalidCustomer = { ...customer, [field]: '' };

      await registerPage.open();
      await registerPage.submitRegistrationForm(invalidCustomer);

      await registerPage.assertFieldErrorIsVisible(errorField, errorText);
    });
  }

  test('Register with mismatched passwords', async ({
    customer,
    registerPage,
  }) => {
    await allure.severity(Severity.NORMAL);

    const invalidCustomer = {
      ...customer,
      confirmPassword: customer.password + 'wrong',
    };

    await registerPage.open();
    await registerPage.submitRegistrationForm(invalidCustomer);

    await registerPage.assertPasswordMismatchErrorIsVisible();
  });

  test('Register with an already existing username', async ({
    registeredCustomer,
    registerPage,
  }) => {
    await allure.severity(Severity.NORMAL);

    const newCustomer = generateNewCustomerData();
    const duplicateCustomer = {
      ...newCustomer,
      username: registeredCustomer.username,
    };

    await registerPage.open();
    await registerPage.submitRegistrationForm(duplicateCustomer);

    await registerPage.assertFieldErrorIsVisible(
      'username',
      'This username already exists.',
    );
  });
});
