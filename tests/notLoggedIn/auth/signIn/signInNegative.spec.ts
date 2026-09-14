import { test } from '../../../_fixtures/fixtures';
import { SIGN_IN_ERROR_MESSAGES } from '../../../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';

const user = generateNewUserData();
const testParameters = [
  {
    username: user.username,
    password: '',
    message: SIGN_IN_ERROR_MESSAGES.REQUIRED.USERNAME_AND_PASSWORD,
    title: 'empty password',
  },
  {
    username: '',
    password: user.password,
    message: SIGN_IN_ERROR_MESSAGES.REQUIRED.USERNAME_AND_PASSWORD,
    title: 'empty username',
  },
  {
    username: user.username,
    password: '0',
    message: SIGN_IN_ERROR_MESSAGES.INVALID.EMAIL_OR_PASSWORD,
    title: 'wrong password',
  },
];

testParameters.forEach(({ username, password, message, title }) => {
  test.describe('Sign in negative tests', () => {
    test(`Sign in with ${title}`, async ({ signInPage }) => {
      await signInPage.open();
      await signInPage.fillUsernameField(username);
      await signInPage.fillPasswordField(password);
      await signInPage.clickSignInButton();
      await signInPage.assertErrorMessageContainsText(message);
    });
  });
});
