import { test } from '../../_fixtures/fixtures';
import { EMPTY_EMAIL_PASSWORD } from '../../../src/ui/constants/authMessages';

const testParameters = [
  {
    username: 'email@email.com',
    password: '',
    message: EMPTY_EMAIL_PASSWORD,
    title: 'empty password',
  },
  {
    username: '',
    password: 'password',
    message: EMPTY_EMAIL_PASSWORD,
    title: 'empty username',
  },
  {
    username: '',
    password: '',
    message: EMPTY_EMAIL_PASSWORD,
    title: 'empty username & password',
  },
];

testParameters.forEach(({ username, password, message, title }) => {
  test.describe('Log in negative tests: empty field', () => {
    test(`Log in with ${title}`, async ({ homePage, logInPage }, testInfo) => {
      testInfo.annotations.push({ type: 'severity', description: 'minor' });

      await homePage.open();

      await homePage.fillUsernameField(username);
      await homePage.fillPasswordField(password);
      await homePage.clickLogInButton();

      await logInPage.assertErrorMessageContainsText(message);
    });
  });
});
