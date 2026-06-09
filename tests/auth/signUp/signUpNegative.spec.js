import { test } from '../../_fixtures/fixtures';
import { severity } from 'allure-js-commons';


const testParameters = [
  { label: 'First name', emptyField: 'firstName' },
  { label: 'Last name', emptyField: 'lastName' },
  { label: 'Address', emptyField: 'address' },
  { label: 'City', emptyField: 'city' },
  { label: 'State', emptyField: 'state' },
  { label: 'Zip Code', emptyField: 'zipCode' },
  { label: 'Phone', emptyField: 'phone' },
  { label: 'Social Security Number', emptyField: 'ssn' },
  { label: 'Username', emptyField: 'username' },
  { label: 'Password', emptyField: 'password' },
  { label: 'Password confirmation', emptyField: 'passwordConfirmation' },
];

test.describe('Signs up negative tests', () => {
  testParameters.forEach(({ label, emptyField }) => {
    test(`Signs up with empty '${label}' field`, async ({
      user,
      signUpPage,
    }) => {
      await label('parentSuite', 'Parabank');
      await label('suite', 'Auth');
      await label('subSuite', 'Sign Up');
      await severity('normal');

      const testUser = { ...user, [emptyField]: '' };

      await signUpPage.open();
      await signUpPage.fillFirstNameField(testUser.firstName);
      await signUpPage.fillLastNameField(testUser.lastName);
      await signUpPage.fillAddressField(testUser.address);
      await signUpPage.fillCityField(testUser.city);
      await signUpPage.fillStateField(testUser.state);
      await signUpPage.fillZipCodeField(testUser.zipCode);
      await signUpPage.fillPhoneField(testUser.phone);
      await signUpPage.fillSsnField(testUser.ssn);
      await signUpPage.fillUsernameField(testUser.username);
      await signUpPage.fillPasswordField(testUser.password);
      await signUpPage.fillRepeatedPasswordField(
        testUser.passwordConfirmation,
      );

      await signUpPage.clickRegisterButton();

      await signUpPage.assertErrorMessageVisible(label,
        `${label} is required.`);
    });
  })
});
