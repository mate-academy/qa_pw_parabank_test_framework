import { test } from '../../_fixtures/fixtures';
import {
  EMPTY_USERNAME_OR_PASSWORD_MESSAGE,
  INVALID_USERNAME_OR_PASSWORD_MESSAGE,
} from '../../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../../src/common/helpers/testData/generateNewUserData';

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
      await homePage.open();
      await signInPage.fillUsernameField(username);
      await signInPage.fillPasswordField(password);
      await signInPage.clickLogInButton();
      await signInPage.assertErrorMessageContainsText(message);
    });
  });
});
