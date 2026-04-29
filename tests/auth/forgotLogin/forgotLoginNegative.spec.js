import { test } from '../../_fixtures/fixtures';
import { generateNewUserData } from '../../../src/common/helpers/testData/generateNewUserData';
import * as AuthErrorMessages from '../../../src/ui/constants/authErrorMessages';

const user = generateNewUserData();

const testParameters = [
  {
    firstName: '',
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    message: AuthErrorMessages.EMPTY_FIRST_NAME_MESSAGE,
    title: 'empty first name',
  },

  {
    firstName: user.firstName,
    lastName: '',
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    message: AuthErrorMessages.EMPTY_LAST_NAME_MESSAGE,
    title: 'empty last name',
  },

  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: '',
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    message: AuthErrorMessages.EMPTY_ADDRESS_MESSAGE,
    title: 'empty address',
  },

  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: '',
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    message: AuthErrorMessages.EMPTY_CITY_MESSAGE,
    title: 'empty city',
  },

  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: '',
    zipCode: user.zipCode,
    ssn: user.ssn,
    message: AuthErrorMessages.EMPTY_STATE_MESSAGE,
    title: 'empty state',
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: '',
    ssn: user.ssn,
    message: AuthErrorMessages.EMPTY_ZIP_CODE_MESSAGE,
    title: 'empty Zip Code',
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: '',
    message: AuthErrorMessages.EMPTY_SSN_MESSAGE,
    title: 'empty SSN',
  },
  {
    firstName: '1',
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    message: AuthErrorMessages.INVALID_CUSTOMER_INFORMATION,
    title: 'invalid Username',
  },
];

testParameters.forEach(
  ({
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    ssn,
    message,
    title,
  }) => {
    test.describe('Sign up negative tests', () => {
      test(`Lookup customer with ${title} negative test flow`, async ({
        signUpPage,
        forgotLoginPage,
        homePage,
      }) => {
        await homePage.clickForgotLoginInfoButton();
        await forgotLoginPage.fillFirstNameField(firstName);
        await forgotLoginPage.fillLastNameField(lastName);
        await forgotLoginPage.fillAddressField(address);
        await forgotLoginPage.fillCityField(city);
        await forgotLoginPage.fillStateField(state);
        await forgotLoginPage.fillZipCodeField(zipCode);
        await forgotLoginPage.fillSSNField(ssn);
        await forgotLoginPage.clickFindMyLoginInfoButton();

        await signUpPage.assertErrorMessageContainsText(message);
      });
    });
  },
);
