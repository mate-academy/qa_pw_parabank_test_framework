import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { fillLoginForm } from '../../../src/ui/actions/auth/login';
import { LOGIN_MISSING_FIELDS_ERROR } from '../../../src/common/constants/auth/authMessages';

const negativeLoginCases = [
  {
    title: 'empty username and password',
    username: '',
    password: '',
    expectedError: LOGIN_MISSING_FIELDS_ERROR,
  },
  {
    title: 'empty username',
    username: '',
    password: 'Passw0rd1',
    expectedError: LOGIN_MISSING_FIELDS_ERROR,
  },
  {
    title: 'empty password',
    username: 'someUser',
    password: '',
    expectedError: LOGIN_MISSING_FIELDS_ERROR,
  },
];

for (const { title, username, password, expectedError } of negativeLoginCases) {
  test(`should not log in with ${title}`, async ({ homePage }) => {
    await allure.severity('normal');

    await homePage.open();

    await homePage.assertOpened();

    await fillLoginForm(homePage, { username, password });
    await homePage.clickLoginButton();

    await homePage.assertLoginError(expectedError);
  });
}
