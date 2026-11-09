import { test } from '../_fixtures/fixtures';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import {
  EMPTY_FIRST_NAME_MESSAGE,
  EMPTY_LAST_NAME_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIP_CODE_MESSAGE,
  EMPTY_SSN_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async () => {
  await allure.parentSuite('Authentication');
  await allure.suite('Forgot Login Info');
  await allure.subSuite('Negative scenarios');
});

const testParameters = [
  {
    title: 'with empty first name',
    user: {
      ...generateNewUserData(),
      firstName: '',
    },
    message: EMPTY_FIRST_NAME_MESSAGE,
  },
  {
    title: 'with empty last name',
    user: {
      ...generateNewUserData(),
      lastName: '',
    },
    message: EMPTY_LAST_NAME_MESSAGE,
  },
  {
    title: 'with empty city',
    user: {
      ...generateNewUserData(),
      city: '',
    },
    message: EMPTY_CITY_MESSAGE,
  },
  {
    title: 'with empty state',
    user: {
      ...generateNewUserData(),
      state: '',
    },
    message: EMPTY_STATE_MESSAGE,
  },
  {
    title: 'with empty zip code',
    user: {
      ...generateNewUserData(),
      zipCode: '',
    },
    message: EMPTY_ZIP_CODE_MESSAGE,
  },
  {
    title: 'with empty SSN',
    user: {
      ...generateNewUserData(),
      ssn: '',
    },
    message: EMPTY_SSN_MESSAGE,
  },
];

testParameters.forEach(({ title, user, message }) => {
  test(`Forgot login info ${title} field negative`, async ({
    customerLookupPage,
    singUpPage,
    page,
  }) => {
    await allure.severity(Severity.NORMAL);
    await singUpPage.open();
    await singUpPage.clickForgotloginInfoButton(page);
    await customerLookupPage.fillFirstNameField(user);
    await customerLookupPage.fillLastNameField(user);
    await customerLookupPage.fillAddressField(user);
    await customerLookupPage.fillCityField(user);
    await customerLookupPage.fillStatefield(user);
    await customerLookupPage.fillZipCodeField(user);
    await customerLookupPage.fillSsnField(user);
    await customerLookupPage.clickFindLoginButton();
    await customerLookupPage.assertErrorMessageEmptyField(message);
  });
});
