import { test, expect } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { EPICS, FEATURES, SEVERITY, URLS } from '../../src/constants/index.js';

test.describe('Logout Tests', () => {
  test('User can logout successfully', async ({ loggedInUser, mainPage }) => {
    await allure.epic(EPICS.AUTH);
    await allure.feature(FEATURES.LOGOUT);
    await allure.story('User is able to logout successfully');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('positive', 'logout', 'authentication');

    await mainPage.logout();
    await mainPage.assertLogoutSuccessful();
  });

  test('User cannot access protected pages after logout', async ({
    page,
    loggedInUser,
    mainPage,
  }) => {
    await allure.epic(EPICS.AUTH);
    await allure.feature(FEATURES.LOGOUT);
    await allure.story('User cannot access protected pages after logout');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('positive', 'logout', 'security');

    await mainPage.logout();

    await page.goto(URLS.ACCOUNTS_OVERVIEW);
    await page.waitForLoadState('networkidle');

    await mainPage.assertAccessDeniedOrRedirected();
  });
});
