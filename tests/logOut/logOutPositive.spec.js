import { test } from '../_fixtures/fixtures';
import { singUpUser } from '../../src/ui/actions/auth/SignUpUser';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async () => {
  await allure.parentSuite('Authentication');
  await allure.suite('Log Out');
  await allure.subSuite('Positive scenarios');
});

test(`Log out positive`, async ({ homePage, singUpPage, page, user }) => {
  await allure.severity(Severity.BLOCKER);
  await singUpUser(page, user);
  await homePage.clickLogOutButton();
  await singUpPage.assertCustomerLogoutTextVisible();
});
