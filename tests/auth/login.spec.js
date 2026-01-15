import { test, expect } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerAndLoginUser } from '../../src/ui/actions/auth/registerAndLoginUser';
import { generateUserData } from '../../src/common/helpers/dataHelpers';
import { EPICS, FEATURES, SEVERITY } from '../../src/constants/index.js';

test.describe('Login Tests', () => {
  test('User can login with valid credentials', async ({
    page,
    loginPage,
    newUserData,
  }) => {
    await allure.epic(EPICS.AUTH);
    await allure.feature(FEATURES.LOGIN);
    await allure.story('User is able to login with valid credentials');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('positive', 'login', 'authentication');

    const userData = newUserData;

    await registerAndLoginUser(page, userData);

    await loginPage.assertSuccessLogin();
  });

  test.describe('Empty fields validation', () => {
    const emptyFieldTests = [
      {
        description: 'empty username',
        fillFields: async (loginPage, testData) => {
          await loginPage.fillPasswordInput(testData.password);
        },
      },
      {
        description: 'empty password',
        fillFields: async (loginPage, testData) => {
          await loginPage.fillUsernameInput(testData.username);
        },
      },
      {
        description: 'empty credentials',
        fillFields: async () => {},
      },
    ];

    emptyFieldTests.forEach(({ description, fillFields }) => {
      test(`User cannot login with ${description}`, async ({ loginPage }) => {
        await allure.epic(EPICS.AUTH);
        await allure.feature(FEATURES.LOGIN);
        await allure.story('User cannot login with empty fields');
        await allure.severity(SEVERITY.NORMAL);
        await allure.tag('negative', 'login', 'validation', 'parametrized');

        const testData = generateUserData();

        await loginPage.open();
        await fillFields(loginPage, testData);
        await loginPage.clickLoginButton();

        await loginPage.assertErrorMessageContainsText('EMPTY_FIELDS');
      });
    });
  });

  test('User cannot login with invalid credentials', async ({ loginPage }) => {
    await allure.epic(EPICS.AUTH);
    await allure.feature(FEATURES.LOGIN);
    await allure.story('User cannot login with invalid credentials');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('negative', 'login', 'validation');

    const invalidData = generateUserData();

    await loginPage.open();
    await loginPage.fillUsernameInput(invalidData.username);
    await loginPage.fillPasswordInput(invalidData.password);
    await loginPage.clickLoginButton();

    await loginPage.assertErrorMessageContainsOneOf(['INVALID_CREDENTIALS', 'INTERNAL_ERROR']);
  });

  test('Forgot login info link works', async ({ loginPage, forgotLoginPage }) => {
    await allure.epic(EPICS.AUTH);
    await allure.feature(FEATURES.LOGIN);
    await allure.story('User is able to navigate to forgot login page');
    await allure.severity(SEVERITY.NORMAL);
    await allure.tag('positive', 'login', 'navigation');

    await loginPage.open();
    await loginPage.clickForgotLoginInfoLink();

    await forgotLoginPage.assertTitleContainsText();
  });
});
