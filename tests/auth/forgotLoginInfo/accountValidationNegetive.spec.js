import { test } from '../../_fixtures/fixtures';
import { testParameters } from '../../../src/common/test data/auth/negativeLookupData';
import * as allure from "allure-js-commons";

testParameters.forEach(({
  firstname,
  lastname,
  address,
  city,
  state,
  zip,
  ssn,
  expectedError,
  title}) => {
    test.describe('Sign up negative tests', () => {
      test(`Negative test: ${title}`, async ({ signUpPage, customerLookupPage }) => {
        await allure.severity(`normal`);

        await customerLookupPage.open();
        await customerLookupPage.fillFirstNameField(firstname);
        await customerLookupPage.fillLastNameField(lastname);
        await customerLookupPage.fillAddressField(address);
        await customerLookupPage.fillCityField(city);
        await customerLookupPage.fillStateField(state);
        await customerLookupPage.fillZipCodeField(zip);
        await customerLookupPage.fillSSNField(ssn);
        await customerLookupPage.clickFindMyLoginInfoButton();

        await signUpPage.assertErrorMessageContainsText(expectedError);
      });
    });
});
