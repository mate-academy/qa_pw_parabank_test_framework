import { test } from '../../_fixtures/fixtures';
import { LOGIN_ERROR_MESSAGE } from '../../../src/common/test data/constants';
import { generateNewUserData } from '../../../src/common/test data/generateUser';
import * as allure from "allure-js-commons";

const user = generateNewUserData();
const testParameters = [
  {
    username: '',
    password: user.password,
    message: LOGIN_ERROR_MESSAGE,
    title: 'empty username'
  },
  {
    username: user.username,
    password: '',
    message: LOGIN_ERROR_MESSAGE,
    title: 'empty password'
  },
  {
    username: '',
    password: '',
    message: LOGIN_ERROR_MESSAGE,
    title: 'empty username and password'
  },
]

testParameters.forEach(({ username, password, message, title }) => {
  test.describe('Sign in negative tests', () => {
    test(`Sign in with ${title}`, async ({ signInPage }) => {
      await allure.severity(`critical`);

      await signInPage.open();
      await signInPage.fillUsernameField(username);
      await signInPage.fillPasswordField(password);
      await signInPage.clickLogInButton();
      await signInPage.assertErrorMessageContainsText(message);
    });
  });
});
