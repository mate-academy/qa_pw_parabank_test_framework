import { test } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import {
  EMPTY_FIRST_NAME_MESSAGE,
  EMPTY_LAST_NAME_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIP_CODE_MESSAGE,
  EMPTY_SSN_MESSAGE,
  EMPTY_USERNAME_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  EMPTY_PASSWORD_REQUIRED_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { Severity } from 'allure-js-commons';

test.beforeEach(async () => {
  await allure.parentSuite('Authentication');
  await allure.suite('Sign up');
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
  {
    title: 'with empty user name',
    user: {
      ...generateNewUserData(),
      username: '',
    },
    message: EMPTY_USERNAME_MESSAGE,
  },
  {
    title: 'with empty password',
    user: {
      ...generateNewUserData(),
      password: '',
    },
    message: EMPTY_PASSWORD_MESSAGE,
  },
  {
    title: 'with empty required password',
    user: {
      ...generateNewUserData(),
      confirmPassword: '',
    },
    message: EMPTY_PASSWORD_REQUIRED_MESSAGE,
  },
];

testParameters.forEach(({ title, user, message }) => {
  test(`Sign Up ${title}`, async ({ singUpPage }) => {
    await allure.severity(Severity.BLOCKER);
    await singUpPage.open();

    await singUpPage.fillFirstNameField(user);
    await singUpPage.fillLastNameField(user);
    await singUpPage.fillAddressField(user);
    await singUpPage.fillCityField(user);
    await singUpPage.fillStateField(user);
    await singUpPage.fillZipCodeField(user);
    await singUpPage.fillPhoneNumberField(user);
    await singUpPage.fillSsnField(user);
    await singUpPage.fillUserNameField(user);
    await singUpPage.fillPasswordField(user);
    await singUpPage.fillReplacePasswordField(user);
    await singUpPage.clickRegisterButton();
    await singUpPage.assertErrorMessageContainsText(message);
  });
});
