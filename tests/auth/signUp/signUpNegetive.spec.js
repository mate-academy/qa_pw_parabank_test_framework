import { test } from '../../_fixtures/fixtures';
import { expect } from 'allure-playwright';
import { testParameters } from '../../../src/common/test data/auth/negativeSignUpData';

testParameters.forEach(({
  firstname,
  lastname,
  address,
  city,
  state,
  zip,
  phone,
  ssn,
  username,
  password,
  confirmPassword,
  expectedError,
  errorSelector,
  title}) => {
    test.describe('Sign up negative tests', () => {
      test(`Negative test: ${title}`, async ({ signUpPage }) => {
        await signUpPage.open();
        await signUpPage.fillFirstNameField(firstname);
        await signUpPage.fillLastNameField(lastname);
        await signUpPage.fillAddressField(address);
        await signUpPage.fillCityField(city);
        await signUpPage.fillStateField(state);
        await signUpPage.fillZipCodeField(zip);
        await signUpPage.fillPhoneNumberField(phone);
        await signUpPage.fillSSNField(ssn);
        await signUpPage.fillUsernameField(username);
        await signUpPage.fillPasswordField(password);
        await signUpPage.fillConfirmPasswordField(confirmPassword);
        await signUpPage.clickRegisterButton();

        await signUpPage.assertErrorMessageContainsText(expectedError, errorSelector);

        if (errorSelector) {
          await expect(signUpPage.page.locator(errorSelector)).toContainText(expectedError);
        } else {
          await expect(signUpPage.page.getByText(expectedError)).toBeVisible();
        }
      });
    });
});
