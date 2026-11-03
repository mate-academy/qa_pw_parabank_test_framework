import { test } from '../../../_fixtures/fixtures';
import { signUpUserAndLogOut } from '../../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

const requiredFields = [
  'firstName',
  'lastName',
  'address',
  'city',
  'state',
  'zipCode',
  'ssn',
  'username',
  'password',
  'confirmPassword',
];

function otherCase(value) {
  const lower = value.toLowerCase();
  return value === lower ? value.toUpperCase() : lower;
}

test.describe('Sign Up Negative', () => {
  test.describe('Sign Up with empty fields', () => {
    requiredFields.forEach(field => {
      test(`User should not be able to sign up with empty ${field} field`, async ({
        registerPage,
        user,
      }) => {
        await registerPage.open();
        await registerPage.fillSignUpFormFields({ ...user, [field]: '' });
        await registerPage.clickRegisterButton();
        await registerPage.assertRegistrationRejected(field);
      });
    });

    test('User should not be able to sign up with all required fields empty', async ({
      registerPage,
      user,
    }) => {
      const emptyRequired = Object.fromEntries(requiredFields.map(field => [field, '']));

      await registerPage.open();
      await registerPage.fillSignUpFormFields({ ...user, ...emptyRequired });
      await registerPage.clickRegisterButton();
      await registerPage.assertRegistrationRejected(requiredFields[0]);

      for (const field of requiredFields.slice(1)) {
        await registerPage.assertErrorMessage(field);
      }
    });

    test('User should not be able to sign up when required fields contain only spaces', async ({
      registerPage,
      user,
    }) => {
      const spaceOnlyFields = requiredFields.filter(field => field !== 'username');
      const spaces = Object.fromEntries(spaceOnlyFields.map(field => [field, ' ']));

      await registerPage.open();
      await registerPage.fillSignUpFormFields({ ...user, ...spaces });
      await registerPage.clickRegisterButton();
      await registerPage.assertRegistrationRejected(spaceOnlyFields[0]);

      for (const field of spaceOnlyFields.slice(1)) {
        await registerPage.assertErrorMessage(field);
      }
    });
  });

  test.describe('Sign Up with mismatched passwords', () => {
    test('User should not be able to sign up when password confirmation does not match', async ({
      registerPage,
      user,
    }) => {
      await registerPage.open();
      await registerPage.fillSignUpFormFields({
        ...user,
        confirmPassword: `${user.password}x`,
      });
      await registerPage.clickRegisterButton();
      await registerPage.assertRegistrationRejected('passwordMismatch');
    });
  });

  test.describe('Sign Up with taken username', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUserAndLogOut(page, user);
    });

    test('User should not be able to sign up with taken username', async ({
      registerPage,
      user,
    }) => {
      await registerPage.open();
      await registerPage.fillSignUpFormFields(user);
      await registerPage.clickRegisterButton();
      await registerPage.assertRegistrationRejected('usernameAlreadyExists');
    });

    test('User should not be able to sign up with the same username in another case', async ({
      registerPage,
      user,
    }) => {
      await registerPage.open();
      await registerPage.fillSignUpFormFields({
        ...user,
        username: otherCase(user.username),
      });
      await registerPage.clickRegisterButton();
      await registerPage.assertRegistrationRejected('usernameAlreadyExists');
    });
  });

  test.describe('Sign Up with taken SSN', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUserAndLogOut(page, user);
    });

    test('User should not be able to sign up with a taken SSN', async ({
      registerPage,
      user,
    }) => {
      const username = faker.internet.username().toLowerCase().slice(0, 10);

      await registerPage.open();
      await registerPage.fillSignUpFormFields({ ...user, username });
      await registerPage.clickRegisterButton();
      await registerPage.assertRegistrationRejected('usernameAlreadyExists');
    });
  });
});