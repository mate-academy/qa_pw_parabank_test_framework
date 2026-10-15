import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.describe('Sign In negative tests', () => {
  const invalidCredentialCases = [
    {
      title: 'empty username',
      username: '',
      password: 'Test123456',
      error: 'Please enter a username and password.',
    },
    {
      title: 'empty password',
      username: 'unknownuser12345',
      password: '',
      error: 'Please enter a username and password.',
    },
    {
      title: 'non-existing username',
      username: 'nonexistinguser987654321',
      password: 'Test123456',
      error: 'The username and password could not be verified.',
    },
  ];

  for (const credentials of invalidCredentialCases) {
    test(`Sign in with ${credentials.title}`, async ({ signInPage }) => {
      await allure.severity('normal');

      await signInPage.open();
      await signInPage.signIn(credentials.username, credentials.password);

      await signInPage.assertLoginError(credentials.error);
    });
  }

  test('Sign in with incorrect password', async ({
    page,
    user,
    signInPage,
  }) => {
    await allure.severity('critical');

    await registerUser(page, user);
    await signInPage.logout();

    await signInPage.open();
    await signInPage.signIn(user.username, 'WrongPassword123');

    await signInPage.assertLoginError(
      'The username and password could not be verified.',
    );
  });
});
