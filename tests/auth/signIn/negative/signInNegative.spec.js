import { test } from '../../../_fixtures/fixtures';

import {
  EMPTY_CREDENTIALS_MESSAGE,
  INVALID_CREDENTIALS_MESSAGE,
} from '../../../../src/ui/constants/signInErrorMessages';

import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';

const user = generateNewUserData();

const testParameters = [
  {
    username: user.username,
    password: '',
    message: EMPTY_CREDENTIALS_MESSAGE,
    title: 'empty password',
  },
  {
    username: '',
    password: user.password,
    message: EMPTY_CREDENTIALS_MESSAGE,
    title: 'empty username',
  },
  {
    username: user.username,
    password: 'wrongPassword',
    message: INVALID_CREDENTIALS_MESSAGE,
    title: 'wrong password',
  },
];

testParameters.forEach(({ username, password, message, title }) => {
  test.describe('Sign in negative tests', () => {
    test(`Sign in with ${title}`, async ({ signInPage }) => {
      await signInPage.open();
      await signInPage.fillUsernameInput(username);
      await signInPage.fillPasswordInput(password);
      await signInPage.clickLogInButton();

      await signInPage.assertErrorMessageContainsText(message);
    });
  });
});
