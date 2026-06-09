import { test } from '../../_fixtures/fixtures';
import { label, severity } from 'allure-js-commons';

test.beforeEach(async ({ signUpPage }) => {
  await signUpPage.open();
});

test('User signs up successfully', async ({ user, signUpPage }) => {
  await label('parentSuite', 'Parabank');
  await label('suite', 'Auth');
  await label('subSuite', 'Sign Up');
  await severity('critical');

  await signUpPage.fillFirstNameField(user.firstName);
  await signUpPage.fillLastNameField(user.lastName);
  await signUpPage.fillAddressField(user.address);
  await signUpPage.fillCityField(user.city);
  await signUpPage.fillStateField(user.state);
  await signUpPage.fillZipCodeField(user.zipCode);
  await signUpPage.fillPhoneField(user.phone);
  await signUpPage.fillSsnField(user.ssn);
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.fillRepeatedPasswordField(user.passwordConfirmation);
  await signUpPage.clickRegisterButton();

  await signUpPage.assertWelcomeTextVisible(user.username);
});
