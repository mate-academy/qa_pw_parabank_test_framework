import { test } from '../_fixtures/fixtures';
import { singUpUser } from '../../src/ui/actions/auth/SignUpUser';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page1, user1 }) => {
  await allure.parentSuite('Authentication');
  await allure.suite('Sign in');
  await allure.subSuite('Positive scenarios');
  await singUpUser(page1, user1);
});

test('Sing In Positive test', async ({
  page2,
  homePage,
  singUpPage,
  user1,
}) => {
  await allure.severity(Severity.BLOCKER);
  await page2.goto('https://parabank.parasoft.com/parabank/index.htm');
  await singUpPage.fillUserNameSingInInput(page2, user1);
  await singUpPage.fillPasswordSingInField(page2, user1);
  await singUpPage.clickSingInButton(page2);
  await homePage.assertAcountServiseIsVisible(page2);
});
