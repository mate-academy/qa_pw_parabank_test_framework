import { test, expect } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../src/ui/actions/auth/registerUser';
import { REQUIRED_REGISTER_FIELDS } from '../../src/ui/actions/auth/registerValidation';
import { EPICS, FEATURES, SEVERITY } from '../../src/constants/index.js';

test.describe('Register Tests', () => {
  test('User can register with valid data', async ({ page, newUserData }) => {
    await allure.epic(EPICS.AUTH);
    await allure.feature(FEATURES.REGISTER);
    await allure.story('User is able to register with valid data');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('positive', 'registration');

    const userData = newUserData;

    await registerUser(page, userData);
  });

  test.describe('Required fields validation', () => {
    REQUIRED_REGISTER_FIELDS.forEach(({ field, errorField }) => {
      test(`User cannot register with empty ${field}`, async ({
        registerPage,
        newUserData,
      }) => {
        await allure.epic(EPICS.AUTH);
        await allure.feature(FEATURES.REGISTER);
        await allure.story('User cannot register with empty required fields');
        await allure.severity(SEVERITY.NORMAL);
        await allure.tag('negative', 'registration', 'validation', 'parametrized');

        await registerPage.open();
        await registerPage.fillRegistrationFormExcept(newUserData, field);
        await registerPage.clickRegisterButton();

        const registerPageWithError = new (registerPage.constructor)(
          registerPage.page,
          0,
          errorField,
        );
        await registerPageWithError.assertErrorMessageContainsText(errorField);
      });
    });
  });

  test('User cannot register with mismatching passwords', async ({
    registerPage,
    newUserData,
  }) => {
    await allure.epic(EPICS.AUTH);
    await allure.feature(FEATURES.REGISTER);
    await allure.story('User cannot register with mismatching passwords');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('negative', 'registration', 'validation');

    const userData = newUserData;

    await registerPage.open();
    await registerPage.fillRegistrationForm({
      ...userData,
      password: userData.password,
    });
    await registerPage.fillConfirmPasswordInput(userData.password + '123');
    await registerPage.clickRegisterButton();

    await registerPage.assertPasswordMismatchError();
  });
});
