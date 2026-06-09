import { test } from '../../_fixtures/fixtures';
import {
  INVALID_USERNAME_OR_PASSWORD_MESSAGE,
  EMPTY_USERNAME_OR_PASSWORD_MESSAGE,
} from '../../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { label, severity } from 'allure-js-commons';

const user = generateNewUserData();
const testParameters = [
  {
    username: user.username,
    password: '',
    message: EMPTY_USERNAME_OR_PASSWORD_MESSAGE,
    title: 'empty password',
  },
  {
    username: '',
    password: user.password,
    message: EMPTY_USERNAME_OR_PASSWORD_MESSAGE,
    title: 'empty username',
  },
  {
    username: user.username,
    password: '1',
    message: INVALID_USERNAME_OR_PASSWORD_MESSAGE,
    title: 'wrong password',
  },
];

testParameters.forEach(({ username, password, message, title }) => {
  test.describe('Sign in negative tests', () => {
    test(`Sign in with ${title}`, async ({ homePage, signInPage }) => {
      await label('parentSuite', 'Parabank');
      await label('suite', 'Auth');
      await label('subSuite', 'Sign In');
      await severity('normal');

      await homePage.open();
      await homePage.fillUsernameField(username);
      await homePage.fillPasswordField(password);
      await homePage.clickLoginButton();

      await signInPage.assertErrorMessageContainsText(message);
    });
  });
});
