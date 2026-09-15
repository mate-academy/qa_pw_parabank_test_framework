import { test } from '../../_fixtures/fixtures';
import { REGISTRATION_ERROR_MESSAGES } from '../../../src/ui/constants/registrationMessages';
import * as allure from 'allure-js-commons';

const requiredFields = [
  { field: 'firstNameField', message: REGISTRATION_ERROR_MESSAGES.firstName },
  { field: 'lastNameField', message: REGISTRATION_ERROR_MESSAGES.lastName },
  { field: 'addressField', message: REGISTRATION_ERROR_MESSAGES.address },
  { field: 'cityField', message: REGISTRATION_ERROR_MESSAGES.city },
  { field: 'stateField', message: REGISTRATION_ERROR_MESSAGES.state },
  { field: 'zipCodeField', message: REGISTRATION_ERROR_MESSAGES.zipCode },
  { field: 'ssnField', message: REGISTRATION_ERROR_MESSAGES.ssn },
];

test.beforeEach(async ({ registeredUser, registerPage }) => {
  void registeredUser;
  await registerPage.clickLogout();
  await allure.severity('critical');
});

test.describe('Customer Lookup form with required fields not filled in', () => {
  for (const { field, message } of requiredFields) {
    test(`Lookup with empty ${field}`, async ({
      homePage,
      forgotLoginInfoPage,
      registeredUser,
    }) => {
      await homePage.clickForgotLoginInfo();

      await forgotLoginInfoPage.fillLookupForm(registeredUser);
      await forgotLoginInfoPage.clearField(field);
      await forgotLoginInfoPage.clickFindMyLoginInfo();
      await forgotLoginInfoPage.verifyErrorMessage(message);
    });
  }
});
