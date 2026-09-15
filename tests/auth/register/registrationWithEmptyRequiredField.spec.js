import { test } from '../../_fixtures/fixtures';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { REGISTRATION_ERROR_MESSAGES } from '../../../src/ui/constants/registrationMessages';
import * as allure from 'allure-js-commons';

const requiredFields = [
  {
    field: 'firstNameField',
    message: REGISTRATION_ERROR_MESSAGES.firstName,
  },
  {
    field: 'lastNameField',
    message: REGISTRATION_ERROR_MESSAGES.lastName,
  },
  {
    field: 'addressField',
    message: REGISTRATION_ERROR_MESSAGES.address,
  },
  {
    field: 'cityField',
    message: REGISTRATION_ERROR_MESSAGES.city,
  },
  {
    field: 'stateField',
    message: REGISTRATION_ERROR_MESSAGES.state,
  },
  {
    field: 'zipCodeField',
    message: REGISTRATION_ERROR_MESSAGES.zipCode,
  },
  {
    field: 'ssnField',
    message: REGISTRATION_ERROR_MESSAGES.ssn,
  },
  {
    field: 'usernameField',
    message: REGISTRATION_ERROR_MESSAGES.username,
  },
  {
    field: 'passwordField',
    message: REGISTRATION_ERROR_MESSAGES.password,
  },
  {
    field: 'confirmPasswordField',
    message: REGISTRATION_ERROR_MESSAGES.confirmPassword,
  },
];

test.describe('Register with required fields not filled in', () => {
  for (const { field, message } of requiredFields) {
    test(`Register with empty ${field}`, async ({ homePage, registerPage }) => {
      await allure.severity('critical');

      const user = generateNewUserData();

      await homePage.open();
      await homePage.clickRegister();
      await registerPage.fillRegistrationForm(user);
      await registerPage.clearField(field);
      await registerPage.submitRegistration();
      await registerPage.verifyErrorMessage(message);
    });
  }
});
