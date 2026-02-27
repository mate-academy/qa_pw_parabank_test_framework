import { test } from '../../_fixtures/fixtures';
import {
  WRONG_USERNAME_OR_PASSWORD,
  EMPTY_USERNAME_AND_PASSWORD,
  
} from '../../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';

const user = generateNewUserData();
const testParameters = [
  {
    username: user.username,
    password: '1',
    message: WRONG_USERNAME_OR_PASSWORD,
    title: 'wrong password',
  },
  {
    username: '',
    password: '1',
    message: EMPTY_USERNAME_AND_PASSWORD,
    title: 'empty username',
  },
  {
    username: '1',
    password: '',
    message: EMPTY_USERNAME_AND_PASSWORD,
    title: 'empty password',
  },
  {
    username: '',
    password: '',
    message: EMPTY_USERNAME_AND_PASSWORD,
    title: 'empty username and password',
  },
];

testParameters.forEach(({ username, password, message, title }) => {
  test.describe('Sign in negative tests', () => {
    test(`Sign in with ${title}`, async ({ signInPage }) => {
      await signInPage.open();
      await signInPage.fillUsernameField(username);
      await signInPage.fillPasswordField(password);
      await signInPage.clicklogInButton();
      await signInPage.assertErrorMessageIsVisible(message);
    });
  });
});
