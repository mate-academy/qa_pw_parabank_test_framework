import { test } from '../_fixtures/fixtures';
import { singUpUser } from '../../src/ui/actions/auth/SignUpUser';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page1, user1 }) => {
  await allure.parentSuite('Authentication');
  await allure.suite('Forgot login info');
  await allure.subSuite('Positive scenarios');
  await singUpUser(page1, user1);
});

test('Forgot login infi positive', async ({
  page2,
  singUpPage,
  user1,
  customerLookupPage,
}) => {
  await allure.severity(Severity.NORMAL);
  await page2.goto('https://parabank.parasoft.com/parabank/index.htm');
  await singUpPage.clickForgotloginInfoButton(page2);
  await customerLookupPage.fillFirstNameField(user1, page2);
  await customerLookupPage.fillLastNameField(user1, page2);
  await customerLookupPage.fillAddressField(user1, page2);
  await customerLookupPage.fillCityField(user1, page2);
  await customerLookupPage.fillStatefield(user1, page2);
  await customerLookupPage.fillZipCodeField(user1, page2);
  await customerLookupPage.fillSsnField(user1, page2);
  await customerLookupPage.clickFindLoginButton(page2);
  await customerLookupPage.assertLoginInformationMessage(page2);
});
