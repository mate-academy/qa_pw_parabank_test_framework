import { test } from '../../../_fixtures/fixtures';
import { INVALID_USERNAME_PASSWORD_MESSAGE, EMPTY_USERNAME_PASSWORD_MESSAGE } from '../../../../src/ui/constants/authErrors';
import { severity, Severity } from 'allure-js-commons';

const loginInfo = [
  { description: 'username and password are empty', overrides: { username: '', password: '' }, expectedError: EMPTY_USERNAME_PASSWORD_MESSAGE },
  { description: 'username is empty', overrides: { username: '', password: '12345' }, expectedError: EMPTY_USERNAME_PASSWORD_MESSAGE },
  { description: 'password is empty', overrides: { username: '12345', password: '' }, expectedError: EMPTY_USERNAME_PASSWORD_MESSAGE },
  { description: 'invalid username', overrides: { username: 'invalid', password: 'qwerty' }, expectedError: INVALID_USERNAME_PASSWORD_MESSAGE },
  { description: 'invalid password', overrides: { username: 'qwerty', password: 'invalid' }, expectedError: INVALID_USERNAME_PASSWORD_MESSAGE },
];

for (const testCase of loginInfo) {
  test(`Login fails when ${testCase.description}`, async ({ homePage }) => {
    await severity(Severity.CRITICAL);
    await homePage.open();
    await homePage.fillUsernameField(testCase.overrides.username);
    await homePage.fillPasswordField(testCase.overrides.password);
    await homePage.clickLogInButton();
    await homePage.assertErrorMessageIsShown(testCase.expectedError);
  });
}