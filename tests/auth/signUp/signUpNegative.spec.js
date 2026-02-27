import { test } from '../../_fixtures/fixtures';
import {
  FIRST_NAME_REQUIRED,
  LAST_NAME_REQUIRED,
  ADDRESS_REQUIRED,
  CITY_REQUIRED,
  STATE_REQUIRED,
  ZIP_CODE_REQUIRED,
  SSN_REQUIRED,
  USERNAME_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_CONFIRMATION_REQUIRED,
} from '../../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';

const user = generateNewUserData();
const testParameters = [
  {
    firstNameField: '',
    lastNameField: user.lastName,
    addressStreetField: user.street,
    addressCityField: user.city,
    addressStateField: user.state,
    addressZipCodeField: user.zipCode,
    phoneNumberField: user.phone,
    ssnField: user.ssn,
    usernameField: user.username,
    passwordField: user.password,
    repeatedPasswordField: user.password,
    title: `empty 'First Name'`,
    message: FIRST_NAME_REQUIRED,
  },
  {
    firstNameField: user.firstName,
    lastNameField: '',
    addressStreetField: user.street,
    addressCityField: user.city,
    addressStateField: user.state,
    addressZipCodeField: user.zipCode,
    phoneNumberField: user.phone,
    ssnField: user.ssn,
    usernameField: user.username,
    passwordField: user.password,
    repeatedPasswordField: user.password,
    title: `empty 'Last Name'`,
    message: LAST_NAME_REQUIRED,
  },
  {
    firstNameField: user.firstName,
    lastNameField: user.lastName,
    addressStreetField: '',
    addressCityField: user.city,
    addressStateField: user.state,
    addressZipCodeField: user.zipCode,
    phoneNumberField: user.phone,
    ssnField: user.ssn,
    usernameField: user.username,
    passwordField: user.password,
    repeatedPasswordField: user.password,
    title: `empty 'Address Street'`,
    message: ADDRESS_REQUIRED,
  },
  {
    firstNameField: user.firstName,
    lastNameField: user.lastName,
    addressStreetField: user.street,
    addressCityField: '',
    addressStateField: user.state,
    addressZipCodeField: user.zipCode,
    phoneNumberField: user.phone,
    ssnField: user.ssn,
    usernameField: user.username,
    passwordField: user.password,
    repeatedPasswordField: user.password,
    title: `empty 'City'`,
    message: CITY_REQUIRED,
  },
  {
    firstNameField: user.firstName,
    lastNameField: user.lastName,
    addressStreetField: user.street,
    addressCityField: user.city,
    addressStateField: '',
    addressZipCodeField: user.zipCode,
    phoneNumberField: user.phone,
    ssnField: user.ssn,
    usernameField: user.username,
    passwordField: user.password,
    repeatedPasswordField: user.password,
    title: `empty 'State'`,
    message: STATE_REQUIRED,
  },
  {
    firstNameField: user.firstName,
    lastNameField: user.lastName,
    addressStreetField: user.street,
    addressCityField: user.city,
    addressStateField: user.state,
    addressZipCodeField: '',
    phoneNumberField: user.phone,
    ssnField: user.ssn,
    usernameField: user.username,
    passwordField: user.password,
    repeatedPasswordField: user.password,
    title: `empty 'Zip Code'`,
    message: ZIP_CODE_REQUIRED,
  },
  {
    firstNameField: user.firstName,
    lastNameField: user.lastName,
    addressStreetField: user.street,
    addressCityField: user.city,
    addressStateField: user.state,
    addressZipCodeField: user.zipCode,
    phoneNumberField: user.phone,
    ssnField: '',
    usernameField: user.username,
    passwordField: user.password,
    repeatedPasswordField: user.password,
    title: `empty 'SSN'`,
    message: SSN_REQUIRED,
  },
  {
    firstNameField: user.firstName,
    lastNameField: user.lastName,
    addressStreetField: user.street,
    addressCityField: user.city,
    addressStateField: user.state,
    addressZipCodeField: user.zipCode,
    phoneNumberField: user.phone,
    ssnField: user.ssn,
    usernameField: '',
    passwordField: user.password,
    repeatedPasswordField: user.password,
    title: `empty 'Username'`,
    message: USERNAME_REQUIRED,
  },
  {
    firstNameField: user.firstName,
    lastNameField: user.lastName,
    addressStreetField: user.street,
    addressCityField: user.city,
    addressStateField: user.state,
    addressZipCodeField: user.zipCode,
    phoneNumberField: user.phone,
    ssnField: user.ssn,
    usernameField: user.username,
    passwordField: '',
    repeatedPasswordField: user.password,
    title: `empty 'Password'`,
    message: PASSWORD_REQUIRED,
  },
  {
    firstNameField: user.firstName,
    lastNameField: user.lastName,
    addressStreetField: user.street,
    addressCityField: user.city,
    addressStateField: user.state,
    addressZipCodeField: user.zipCode,
    phoneNumberField: user.phone,
    ssnField: user.ssn,
    usernameField: user.username,
    passwordField: user.password,
    repeatedPasswordField: '',
    title: `empty 'Password Confirmation'`,
    message: PASSWORD_CONFIRMATION_REQUIRED,
  },
];

test.describe('Sign up negative tests', () => {
  testParameters.forEach(({
    firstNameField,
    lastNameField,
    addressStreetField,
    addressCityField,
    addressStateField,
    addressZipCodeField,
    phoneNumberField,
    ssnField,
    usernameField,
    passwordField,
    repeatedPasswordField,
    title,
    message,
  }) => {
    test(`Sign up with ${title}`, async ({ signUpPage }) => {
      await signUpPage.open();

      await signUpPage.fillFirstNameField(firstNameField);
      await signUpPage.fillLastNameField(lastNameField);
      await signUpPage.fillAddressStreetField(addressStreetField);
      await signUpPage.fillAddressCityField(addressCityField);
      await signUpPage.fillAddressStateField(addressStateField);
      await signUpPage.fillAddressZipCodeField(addressZipCodeField);
      await signUpPage.fillPhoneNumberField(phoneNumberField);
      await signUpPage.fillSsnField(ssnField);
      await signUpPage.fillUsernameField(usernameField);
      await signUpPage.fillPasswordField(passwordField);
      await signUpPage.fillRepeatedPasswordField(repeatedPasswordField);

      await signUpPage.clickRegisterButton();
      await signUpPage.assertErrorMessageIsVisible(message);
    });
  });
});
