import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { UPDATE_PROFILE_ERROR_MESSAGES } from '../../../src/ui/constants/updateProfileMessages';

const requiredFields = [
  {
    field: 'firstNameField',
    message: UPDATE_PROFILE_ERROR_MESSAGES.firstName,
  },
  {
    field: 'lastNameField',
    message: UPDATE_PROFILE_ERROR_MESSAGES.lastName,
  },
  {
    field: 'addressField',
    message: UPDATE_PROFILE_ERROR_MESSAGES.address,
  },
  {
    field: 'cityField',
    message: UPDATE_PROFILE_ERROR_MESSAGES.city,
  },
  {
    field: 'stateField',
    message: UPDATE_PROFILE_ERROR_MESSAGES.state,
  },
  {
    field: 'zipCodeField',
    message: UPDATE_PROFILE_ERROR_MESSAGES.zipCode,
  },
];

test.beforeEach(async ({ registeredUser }) => {
  void registeredUser;

  await allure.severity('critical');
});

test.describe('Update Profile with required fields not filled in', () => {
  for (const { field, message } of requiredFields) {
    test(`Update Profile with empty ${field}`, async ({
      updateProfilePage,
      registeredUser,
    }) => {
      await updateProfilePage.goToUpdateProfile();
      await updateProfilePage.fillProfileForm(registeredUser);
      await updateProfilePage.clearField(field);
      await updateProfilePage.clickUpdateProfile();
      await updateProfilePage.verifyErrorMessage(message);
    });
  }
});
