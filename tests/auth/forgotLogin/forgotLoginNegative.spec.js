import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.describe('Forgot Login Info negative tests', () => {
  const requiredFieldCases = [
    {
      title: 'first name',
      field: 'firstName',
      error: 'First name is required.',
    },
    {
      title: 'last name',
      field: 'lastName',
      error: 'Last name is required.',
    },
    {
      title: 'address',
      field: 'address',
      error: 'Address is required.',
    },
    {
      title: 'city',
      field: 'city',
      error: 'City is required.',
    },
    {
      title: 'state',
      field: 'state',
      error: 'State is required.',
    },
    {
      title: 'zip code',
      field: 'zipCode',
      error: 'Zip Code is required.',
    },
    {
      title: 'SSN',
      field: 'ssn',
      error: 'Social Security Number is required.',
    },
  ];

  for (const testCase of requiredFieldCases) {
    test(`Recover login with empty ${testCase.title}`, async ({
      forgotLoginPage,
      user,
    }) => {
      await allure.severity('normal');

      const invalidUser = {
        ...user,
        [testCase.field]: '',
      };

      await forgotLoginPage.open();
      await forgotLoginPage.fillRecoveryForm(invalidUser);
      await forgotLoginPage.clickFindLoginInfoButton();

      await forgotLoginPage.assertErrorMessageContainsText(testCase.error);
    });
  }

  test('Recover login with incorrect SSN', async ({
    page,
    user,
    signInPage,
    forgotLoginPage,
  }) => {
    await allure.severity('critical');

    await registerUser(page, user);
    await signInPage.logout();

    const invalidUser = {
      ...user,
      ssn: user.ssn === '000000000' ? '111111111' : '000000000',
    };

    await forgotLoginPage.open();
    await forgotLoginPage.fillRecoveryForm(invalidUser);
    await forgotLoginPage.clickFindLoginInfoButton();

    await forgotLoginPage.assertErrorMessageContainsText(
      'The customer information provided could not be found.',
    );
  });
});
