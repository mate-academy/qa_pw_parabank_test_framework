import { test } from '../../_fixtures/fixtures';
import {
  EMPTY_FIRST_NAME_MESSAGE,
  EMPTY_LAST_NAME_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIP_CODE_MESSAGE,
  EMPTY_SSN_MESSAGE,
  EMPTY_USERNAME_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  EMPTY_CONFIRM_MESSAGE,
  DIFFERENT_PASSWORD_MESSAGE,
} from '../../../src/ui/constants/signUpAuthErrorMessages';

test.describe('Sign up negative tests', () => {
  const requiredFieldsTests = [
    {
      fieldName: 'firstName',
      fieldKey: 'firstName',
      errorMsg: EMPTY_FIRST_NAME_MESSAGE,
      fillMethod: p => p.fillFirstNameField(''),
    },
    {
      fieldName: 'last name',
      fieldKey: 'lastName',
      errorMsg: EMPTY_LAST_NAME_MESSAGE,
      fillMethod: p => p.fillLastNameField(''),
    },
    {
      fieldName: 'address',
      fieldKey: 'address.street',
      errorMsg: EMPTY_ADDRESS_MESSAGE,
      fillMethod: p => p.fillAddressField(''),
    },
    {
      fieldName: 'city',
      fieldKey: 'address.city',
      errorMsg: EMPTY_CITY_MESSAGE,
      fillMethod: p => p.fillCityField(''),
    },
    {
      fieldName: 'state',
      fieldKey: 'address.state',
      errorMsg: EMPTY_STATE_MESSAGE,
      fillMethod: p => p.fillStateField(''),
    },
    {
      fieldName: 'zip code',
      fieldKey: 'address.zipCode',
      errorMsg: EMPTY_ZIP_CODE_MESSAGE,
      fillMethod: p => p.fillZipCodeField(''),
    },
    {
      fieldName: 'SSN',
      fieldKey: 'ssn',
      errorMsg: EMPTY_SSN_MESSAGE,
      fillMethod: p => p.fillSsnField(''),
    },
    {
      fieldName: 'username',
      fieldKey: 'username',
      errorMsg: EMPTY_USERNAME_MESSAGE,
      fillMethod: p => p.fillUsernameField(''),
    },
    {
      fieldName: 'password',
      fieldKey: 'password',
      errorMsg: EMPTY_PASSWORD_MESSAGE,
      fillMethod: p => p.fillPasswordField(''),
    },
    {
      fieldName: 'confirm password',
      fieldKey: 'repeatedPassword',
      errorMsg: EMPTY_CONFIRM_MESSAGE,
      fillMethod: p => p.fillConfirmField(''),
    },
  ];

  for (const {
    fieldName,
    fieldKey,
    errorMsg,
    fillMethod,
  } of requiredFieldsTests) {
    test(`Sign up with empty ${fieldName}`, async ({ user, signUpPage }) => {
      await signUpPage.open();
      await signUpPage.submitSignUpForm(user);
      await fillMethod(signUpPage);
      await signUpPage.clickRegisterButton();

      await signUpPage.verifyFieldError(fieldKey, errorMsg);
    });
  }

  test('Sign up with mismatched passwords', async ({ user, signUpPage }) => {
    await signUpPage.open();
    await signUpPage.submitSignUpForm(user);
    await signUpPage.fillConfirmField('DifferentPassword123!');
    await signUpPage.clickRegisterButton();

    await signUpPage.verifyFieldError(
      'repeatedPassword',
      DIFFERENT_PASSWORD_MESSAGE,
    );
  });
});
