import { test } from '../../_fixtures/fixtures';
import { SignUpPage } from '../../../src/ui/pages/auth/SignUpPage';
import {
  EMPTY_USERNAME_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  EMPTY_ALL_FIELDS_MESSAGE,
  INCORRECT_USERNAME_MESSAGE,
  INCORRECT_PASSWORD_MESSAGE,
  INCORRECT_ALL_FIELDS_MESSAGE,
} from '../../../src/ui/constants/signInAuthErrorMessages';

const workingNegativeTestParameters = [
  {
    username: '',
    password: 'AnyPassword123!',
    message: EMPTY_USERNAME_MESSAGE,
    title: 'empty username',
  },
  {
    username: 'AnyUser',
    password: '',
    message: EMPTY_PASSWORD_MESSAGE,
    title: 'empty password',
  },
  {
    username: '',
    password: '',
    message: EMPTY_ALL_FIELDS_MESSAGE,
    title: 'empty all fields',
  },
];

test.describe('Sign In Negative tests - Empty fields validation', () => {
  workingNegativeTestParameters.forEach(
    ({ username, password, message, title }) => {
      test(`Sign In with ${title}`, async ({ signInPage, page }) => {
        await signInPage.open();
        await signInPage.fillUsernameField(username);
        await signInPage.fillPasswordField(password);

        console.log('\n============================');
        console.log(`TEST CASE: ${title}`);
        console.log('Input credentials:', { username, password });

        const responsePromise = page.waitForResponse(r =>
          r.url().includes('login'),
        );

        await signInPage.clickLogInButton();

        const resp = await responsePromise;
        console.log('Server Response Status:', resp.status());
        console.log('Server Response Body:', await resp.text());
        console.log('============================\n');

        await signInPage.assertErrorMessageContainsText(message);
      });
    },
  );
});

test.describe('Sign In Negative tests - Invalid username and credentials', () => {
  const skippedParameters = [
    {
      username: 'q',
      password: 'AnyPassword123!',
      message: INCORRECT_USERNAME_MESSAGE,
      title: 'incorect username',
    },
    {
      username: 'q',
      password: '1',
      message: INCORRECT_ALL_FIELDS_MESSAGE,
      title: 'incorect all fields',
    },
  ];

  skippedParameters.forEach(({ username, password, message, title }) => {
    test(`Sign In with ${title}`, async ({ signInPage, page }) => {
      // skip: backend throws 500 for invalid username and incorrect credentials — issue #123
      test.skip(
        true,
        'Backend throws 500 for invalid username and incorrect credentials — issue #123',
      );

      await signInPage.open();
      await signInPage.fillUsernameField(username);
      await signInPage.fillPasswordField(password);
      await signInPage.clickLogInButton();
      await signInPage.assertErrorMessageContainsText(message);
    });
  });
});

test.describe('Sign In Negative tests - Existing user with incorrect password', () => {
  let client;

  test.beforeEach(async ({ page, user }) => {
    client = user;
    const signUpPage = new SignUpPage(page);

    await signUpPage.open();
    await signUpPage.registerUser(client);
    await signUpPage.verifySuccessRegistration(client.username);
    await signUpPage.clickLogOut();
  });

  test('Sign In with existing user and incorrect password', async ({
    signInPage,
    page,
  }) => {
    // skip: backend throws 500 for existing user with incorrect password — issue #123
    test.skip(
      true,
      'Backend throws 500 for existing user with incorrect password — issue #123',
    );

    await signInPage.open();
    await signInPage.fillUsernameField(client.username);
    await signInPage.fillPasswordField('WrongPassword123!');
    await signInPage.clickLogInButton();
    await signInPage.assertErrorMessageContainsText(INCORRECT_PASSWORD_MESSAGE);
  });
});
