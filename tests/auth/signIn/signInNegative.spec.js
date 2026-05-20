import { test } from '../../_fixtures/fixtures';
import {
  SIGN_IN_INCORRECT_CREDENTIALS_ERROR_MESSAGE,
  SIGN_IN_MISSING_CREDENTIALS_ERROR_MESSAGE,
} from '../../../src/ui/constants/authMessages';
import { faker } from '@faker-js/faker';
import * as allure from 'allure-js-commons';

const testParameters = [
  {
    scenario: 'both fields are wrong',
    useUsername: true,
    usePassword: true,
    errorMessage: SIGN_IN_INCORRECT_CREDENTIALS_ERROR_MESSAGE,
  },
  {
    scenario: 'password is missing',
    useUsername: true,
    usePassword: false,
    errorMessage: SIGN_IN_MISSING_CREDENTIALS_ERROR_MESSAGE,
  },
  {
    scenario: 'username is missing',
    useUsername: false,
    usePassword: true,
    errorMessage: SIGN_IN_MISSING_CREDENTIALS_ERROR_MESSAGE,
  },
  {
    scenario: 'both fields are empty',
    useUsername: false,
    usePassword: false,
    errorMessage: SIGN_IN_MISSING_CREDENTIALS_ERROR_MESSAGE,
  },
];

test.describe(`Sign in negative tests`, () => {
  testParameters.forEach(
    ({ scenario, useUsername, usePassword, errorMessage }) => {
      test(`Shows error when ${scenario}`, async ({ signInPage }) => {
        await allure.severity('normal');

        const username = useUsername ? faker.internet.username() : '';
        const password = usePassword ? faker.internet.password() : '';
        await signInPage.open();
        await signInPage.fillUsernameField(username);
        await signInPage.fillPasswordField(password);
        await signInPage.clickLogInButton();
        await signInPage.assertErrorMessage(errorMessage);
      });
    },
  );
});
