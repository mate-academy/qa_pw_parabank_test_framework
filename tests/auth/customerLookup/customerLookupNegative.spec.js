import { test } from '../../_fixtures/fixtures';
import {
  CUSTOMER_LOOKUP_FIRST_NAME_REQUIRED_ERROR_MESSAGE,
  CUSTOMER_LOOKUP_LAST_NAME_REQUIRED_ERROR_MESSAGE,
  CUSTOMER_LOOKUP_ADDRESS_REQUIRED_ERROR_MESSAGE,
  CUSTOMER_LOOKUP_CITY_REQUIRED_ERROR_MESSAGE,
  CUSTOMER_LOOKUP_STATE_REQUIRED_ERROR_MESSAGE,
  CUSTOMER_LOOKUP_ZIP_CODE_REQUIRED_ERROR_MESSAGE,
  CUSTOMER_LOOKUP_SSN_REQUIRED_ERROR_MESSAGE,
  CUSTOMER_LOOKUP_SERVER_ERROR_MESSAGE,
} from '../../../src/ui/constants/authMessages';
import * as allure from 'allure-js-commons';

test.describe(`Customer lookup negative tests`, () => {
  test(`Empty fields`, async ({ customerLookupPage }) => {
    await allure.severity('normal');

    await customerLookupPage.open();
    await customerLookupPage.clickFindMyLoginInfoButton();
    await customerLookupPage.assertErrorMessage(
      customerLookupPage.firstNameErrorMessage,
      CUSTOMER_LOOKUP_FIRST_NAME_REQUIRED_ERROR_MESSAGE,
    );
    await customerLookupPage.assertErrorMessage(
      customerLookupPage.lastNameErrorMessage,
      CUSTOMER_LOOKUP_LAST_NAME_REQUIRED_ERROR_MESSAGE,
    );
    await customerLookupPage.assertErrorMessage(
      customerLookupPage.addressErrorMessage,
      CUSTOMER_LOOKUP_ADDRESS_REQUIRED_ERROR_MESSAGE,
    );
    await customerLookupPage.assertErrorMessage(
      customerLookupPage.cityErrorMessage,
      CUSTOMER_LOOKUP_CITY_REQUIRED_ERROR_MESSAGE,
    );
    await customerLookupPage.assertErrorMessage(
      customerLookupPage.stateErrorMessage,
      CUSTOMER_LOOKUP_STATE_REQUIRED_ERROR_MESSAGE,
    );
    await customerLookupPage.assertErrorMessage(
      customerLookupPage.zipCodeErrorMessage,
      CUSTOMER_LOOKUP_ZIP_CODE_REQUIRED_ERROR_MESSAGE,
    );
    await customerLookupPage.assertErrorMessage(
      customerLookupPage.ssnErrorMessage,
      CUSTOMER_LOOKUP_SSN_REQUIRED_ERROR_MESSAGE,
    );
  });

  test(`Incorrect data`, async ({ userData, customerLookupPage }) => {
    await allure.severity('normal');

    await customerLookupPage.open();
    await customerLookupPage.fillForm(userData);
    await customerLookupPage.clickFindMyLoginInfoButton();
    await customerLookupPage.assertSubmitErrorMessage(
      CUSTOMER_LOOKUP_SERVER_ERROR_MESSAGE,
    );
  });
});
