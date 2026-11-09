import { test } from '../_fixtures/fixtures';
import { EMPTY_USERNAME_OR_PASSWORD } from '../../src/ui/constants/authErrorMessages';
import { USER_NOT_BE_VERIFIED } from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async () => {
  await allure.parentSuite('Authentication');
  await allure.suite('Sign in');
  await allure.subSuite('Negative scenarios');
});

const testParameters = [
  {
    title: 'with empty user name',
    user: {
      ...generateNewUserData(),
      username: '',
    },
    message: EMPTY_USERNAME_OR_PASSWORD,
  },
  {
    title: 'with empty password',
    user: {
      ...generateNewUserData(),
      password: '',
    },
    message: EMPTY_USERNAME_OR_PASSWORD,
  },
  {
    title: 'user not verified',
    user: {
      ...generateNewUserData(),
    },
    message: USER_NOT_BE_VERIFIED,
  },
];

testParameters.forEach(({ title, user, message }) => {
  test(`Sing In ${title} Negative`, async ({ singUpPage }) => {
    await allure.severity(Severity.BLOCKER);
    await singUpPage.open();
    await singUpPage.fillUserNameSingIn(user);
    await singUpPage.fillPasswordSingIn(user);
    await singUpPage.clickSingInButtonNegative();
    await singUpPage.assertErrorMessageContainsText(message);
  });
});
