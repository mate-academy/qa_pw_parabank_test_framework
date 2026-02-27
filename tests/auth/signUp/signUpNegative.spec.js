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


const baseUser = {
  firstName: user.firstName,
  lastName: user.lastName,
  street: user.street,
  city: user.city,
  state: user.state,
  zipCode: user.zipCode,
  phone: user.phone,
  ssn: user.ssn,
  username: user.username,
  password: user.password,
  repeatedPassword: user.password,
};


const testParameters = [
  { title: `empty 'First Name'`, overrides: { firstName: '' }, message: FIRST_NAME_REQUIRED },
  { title: `empty 'Last Name'`, overrides: { lastName: '' }, message: LAST_NAME_REQUIRED },
  { title: `empty 'Address Street'`, overrides: { street: '' }, message: ADDRESS_REQUIRED },
  { title: `empty 'City'`, overrides: { city: '' }, message: CITY_REQUIRED },
  { title: `empty 'State'`, overrides: { state: '' }, message: STATE_REQUIRED },
  { title: `empty 'Zip Code'`, overrides: { zipCode: '' }, message: ZIP_CODE_REQUIRED },
  { title: `empty 'SSN'`, overrides: { ssn: '' }, message: SSN_REQUIRED },
  { title: `empty 'Username'`, overrides: { username: '' }, message: USERNAME_REQUIRED },
  { title: `empty 'Password'`, overrides: { password: '' }, message: PASSWORD_REQUIRED },
  {
    title: `empty 'Password Confirmation'`,
    overrides: { repeatedPassword: '' },
    message: PASSWORD_CONFIRMATION_REQUIRED,
  },
];

test.describe('Sign up negative tests', () => {
  testParameters.forEach(({ title, overrides, message }) => {
    test(`Sign up with ${title}`, async ({ signUpPage }) => {
      const invalidUser = { ...baseUser, ...overrides };

      await signUpPage.open();
      await signUpPage.submitSignUpForm(invalidUser);
      await signUpPage.clickRegisterButton();

      await signUpPage.assertErrorMessageIsVisible(message);
    });
  });
});