import { test } from '../../../_fixtures/fixtures';
import { SIGN_UP_ERROR_MESSAGES } from '../../../../src/ui/constants/authErrorMessages';
import { REQUIRED_SIGN_UP_FIELDS } from '../../../../src/ui/constants/signUpFields';
import { SIGN_UP_FIELDS } from '../../../../src/ui/constants/signUpFields';

let testParameters = [];

for (const [key, fieldName] of Object.entries(REQUIRED_SIGN_UP_FIELDS)) {
  testParameters.push({
    nameOfTheField: fieldName,
    value: '',
    errorMessage: SIGN_UP_ERROR_MESSAGES.REQUIRED[key],
  });
}

test.describe('Sign up negative tests', () => {
  testParameters.forEach(({ nameOfTheField, errorMessage }) => {
    test(`Error is displayed for empty ${nameOfTheField}`, async ({
      user,
      signUpPage,
    }) => {
      await signUpPage.open();
      await signUpPage.fillEmptyNegativeSignUpForm(user, nameOfTheField);
      await signUpPage.clickSignUpButton();
      await signUpPage.assertErrorMessageContainsText(
        nameOfTheField,
        errorMessage,
      );
    });
  });

  test(`Error is displayed when passwords do not match `, async ({
    user,
    signUpPage,
  }) => {
    await signUpPage.open();
    await signUpPage.fillField(SIGN_UP_FIELDS.FIRST_NAME, user.firstName);
    await signUpPage.fillField(SIGN_UP_FIELDS.LAST_NAME, user.lastName);
    await signUpPage.fillField(
      SIGN_UP_FIELDS.ADDRESS_STREET,
      user.addressStreet,
    );
    await signUpPage.fillField(SIGN_UP_FIELDS.ADDRESS_CITY, user.addressCity);
    await signUpPage.fillField(SIGN_UP_FIELDS.ADDRESS_STATE, user.addressState);
    await signUpPage.fillField(
      SIGN_UP_FIELDS.ADDRESS_ZIP_CODE,
      user.addressZipCode,
    );
    await signUpPage.fillField(SIGN_UP_FIELDS.PHONE_NUMBER, user.phoneNumber);
    await signUpPage.fillField(SIGN_UP_FIELDS.SSN, user.snn);
    await signUpPage.fillField(SIGN_UP_FIELDS.USERNAME, user.username);
    await signUpPage.fillField(SIGN_UP_FIELDS.PASSWORD, user.password);
    await signUpPage.fillField(
      SIGN_UP_FIELDS.REPEATED_PASSWORD,
      user.newPassword,
    );

    await signUpPage.clickSignUpButton();
    await signUpPage.assertErrorMessageContainsText(
      SIGN_UP_FIELDS.REPEATED_PASSWORD,
      SIGN_UP_ERROR_MESSAGES.PASSWORD.NOT_MATCH,
    );
  });
});
