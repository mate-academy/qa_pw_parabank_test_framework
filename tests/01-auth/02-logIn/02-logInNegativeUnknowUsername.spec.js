import { test } from '../../_fixtures/fixtures';
import { INVALID_CREDENTIALS } from '../../../src/ui/constants/authMessages';

const testParameters = [
  {
    username: 'unkn0wn@me.com',
    password: 'unkn0wn@me.com',
    message: INVALID_CREDENTIALS,
    title: 'not exisitng username',
  },
  {
    username: '<script>',
    password: 'password',
    message: INVALID_CREDENTIALS,
    title: 'XSS username',
  },
  {
    username: ' ',
    password: ' ',
    message: INVALID_CREDENTIALS,
    title: 'spaced username',
  },
];

testParameters.forEach(({ username, password, message, title }) => {
  test.describe('Log in negative tests: unknown username', () => {
    test(`Log in with ${title}`, async ({ homePage, logInPage }, testInfo) => {
      testInfo.annotations.push({ type: 'severity', description: 'minor' });
      testInfo.annotations.push({ type: 'issue', description: 'BUG-002' });

      await homePage.open();

      await homePage.fillUsernameField(username);
      await homePage.fillPasswordField(password);
      await homePage.clickLogInButton();
      await logInPage.assertErrorMessageContainsText(message);
    });
  });
});
