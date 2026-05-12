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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
    message: AuthErrorMessages.EMPTY_SSN_MESSAGE,
    title: 'empty SSN',
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    username: '',
    password: user.password,
    confirmPassword: user.password,
    message: AuthErrorMessages.EMPTY_USERNAME_MESSAGE,
    title: 'empty Username',
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    username: user.username,
    password: '',
    confirmPassword: user.password,
    message: AuthErrorMessages.EMPTY_PASSWORD_MESSAGE,
    title: 'empty Password',
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: '',
    message: AuthErrorMessages.EMPTY_CONFIRM_PASSWORD_MESSAGE,
    title: 'empty Confirm Password',
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
    username,
    password,
    confirmPassword,
    message,
    title,
  }) => {
    test.describe('Sign up negative tests', () => {
      test(`Sign up with ${title} negative test flow`, async ({
        signUpPage,
      }) => {
        await signUpPage.open();
        await signUpPage.fillFirstNameField(firstName);
        await signUpPage.fillLastNameField(lastName);
        await signUpPage.fillAddressField(address);
        await signUpPage.fillCityField(city);
        await signUpPage.fillStateField(state);
        await signUpPage.fillZipCodeField(zipCode);
        await signUpPage.fillSSNField(ssn);
        await signUpPage.fillUsernameField(username);
        await signUpPage.fillPasswordField(password);
        await signUpPage.fillConfirmPasswordField(confirmPassword);
        await signUpPage.clickRegisterButton();

        await signUpPage.assertErrorMessageContainsText(message);
      });
    });
  },
);
