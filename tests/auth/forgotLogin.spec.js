import { test, expect } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../src/ui/actions/auth/registerUser';
import { generateUserData } from '../../src/common/helpers/dataHelpers';
import { REQUIRED_FORGOT_LOGIN_FIELDS } from '../../src/ui/actions/auth/lookupForgotLogin';
import { EPICS, FEATURES, SEVERITY } from '../../src/constants/index.js';

test.describe('Forgot Login Info Tests', () => {
  test('User can access Forgot Login Info page', async ({ forgotLoginPage }) => {
    await allure.epic(EPICS.AUTH);
    await allure.feature(FEATURES.FORGOT_LOGIN);
    await allure.story('User is able to access forgot login info page');
    await allure.severity(SEVERITY.NORMAL);
    await allure.tag('positive', 'forgot-login', 'navigation');

    await forgotLoginPage.open();
    await forgotLoginPage.assertTitleContainsText();
  });

  test('User can lookup login with valid customer data', async ({
    page,
    mainPage,
    forgotLoginPage,
    newUserData,
  }) => {
    await allure.epic(EPICS.AUTH);
    await allure.feature(FEATURES.FORGOT_LOGIN);
    await allure.story('User is able to lookup login with valid customer data');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('positive', 'forgot-login', 'lookup');

    await registerUser(page, newUserData);

    await mainPage.logout();

    await forgotLoginPage.open();
    await forgotLoginPage.fillLookupForm(newUserData);
    await forgotLoginPage.clickFindLoginButton();

    await forgotLoginPage.assertSuccessMessageIsVisible();
  });

  test('User cannot lookup with invalid data', async ({ forgotLoginPage }) => {
    await allure.epic(EPICS.AUTH);
    await allure.feature(FEATURES.FORGOT_LOGIN);
    await allure.story('User cannot lookup with invalid data');
    await allure.severity(SEVERITY.NORMAL);
    await allure.tag('negative', 'forgot-login', 'validation');

    const invalidData = generateUserData();

    await forgotLoginPage.open();
    await forgotLoginPage.fillFirstNameInput(invalidData.firstName);
    await forgotLoginPage.fillLastNameInput(invalidData.lastName);
    await forgotLoginPage.fillAddressInput(invalidData.address);
    await forgotLoginPage.fillCityInput(invalidData.city);
    await forgotLoginPage.fillStateInput(invalidData.state);
    await forgotLoginPage.fillZipCodeInput(invalidData.zipCode);
    await forgotLoginPage.fillSsnInput(invalidData.ssn);
    await forgotLoginPage.clickFindLoginButton();

    await forgotLoginPage.assertErrorMessageIsVisible();
  });

  test.describe('Required fields validation', () => {
    REQUIRED_FORGOT_LOGIN_FIELDS.forEach(({ field, errorField }) => {
      test(`User cannot lookup with empty ${field}`, async ({
        forgotLoginPage,
        newUserData,
      }) => {
        await allure.epic(EPICS.AUTH);
        await allure.feature(FEATURES.FORGOT_LOGIN);
        await allure.story('User cannot lookup with empty required fields');
        await allure.severity(SEVERITY.NORMAL);
        await allure.tag('negative', 'forgot-login', 'validation', 'parametrized');

        await forgotLoginPage.open();
        await forgotLoginPage.fillLookupFormExcept(newUserData, field);
        await forgotLoginPage.clickFindLoginButton();

        const forgotLoginPageWithError = new (forgotLoginPage.constructor)(
          forgotLoginPage.page,
          0,
          errorField,
        );
        await forgotLoginPageWithError.assertErrorMessageContainsText(errorField);
      });
    });
  });
});
