import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';

const requiredFieldCases = [
  {
    field: 'firstName',
    title: 'first name',
    error: 'First name is required.',
  },
  {
    field: 'lastName',
    title: 'last name',
    error: 'Last name is required.',
  },
  {
    field: 'address',
    title: 'address',
    error: 'Address is required.',
  },
  {
    field: 'city',
    title: 'city',
    error: 'City is required.',
  },
  {
    field: 'state',
    title: 'state',
    error: 'State is required.',
  },
  {
    field: 'zipCode',
    title: 'zip code',
    error: 'Zip Code is required.',
  },
  {
    field: 'ssn',
    title: 'SSN',
    error: 'Social Security Number is required.',
  },
  {
    field: 'username',
    title: 'username',
    error: 'Username is required.',
  },
  {
    field: 'password',
    title: 'password',
    error: 'Password is required.',
  },
  {
    field: 'confirmPassword',
    title: 'password confirmation',
    error: 'Password confirmation is required.',
  },
];

test.describe('Register negative tests', () => {
  for (const { field, title, error } of requiredFieldCases) {
    test(`Register with empty ${title}`, async ({ user, registerPage }) => {
      await allure.severity('normal');

      const invalidUser = {
        ...user,
        [field]: '',
      };

      await registerPage.open();
      await registerPage.fillRegistrationForm(invalidUser);
      await registerPage.clickRegisterButton();

      await registerPage.assertErrorMessageContainsText(error);
    });
  }

  test('Register with mismatched passwords', async ({ user, registerPage }) => {
    await allure.severity('critical');

    const invalidUser = {
      ...user,
      confirmPassword: 'DifferentPassword123!',
    };

    await registerPage.open();
    await registerPage.fillRegistrationForm(invalidUser);
    await registerPage.clickRegisterButton();

    await registerPage.assertErrorMessageContainsText(
      'Passwords did not match.',
    );
  });
});
