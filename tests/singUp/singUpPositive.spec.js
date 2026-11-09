import { test } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async () => {
  await allure.parentSuite('Authentication');
  await allure.suite('Sign up');
  await allure.subSuite('Positive scenarios');
});

test('Successful `Sign up` flow test', async ({
  user,
  singUpPage,
  homePage,
}) => {
  await allure.severity(Severity.BLOCKER);
  await singUpPage.open();
  await singUpPage.fillFirstNameField(user);
  await singUpPage.fillLastNameField(user);
  await singUpPage.fillAddressField(user);
  await singUpPage.fillCityField(user);
  await singUpPage.fillStateField(user);
  await singUpPage.fillZipCodeField(user);
  await singUpPage.fillPhoneNumberField(user);
  await singUpPage.fillSsnField(user);
  await singUpPage.fillUserNameField(user);
  await singUpPage.fillPasswordField(user);
  await singUpPage.fillReplacePasswordField(user);
  await singUpPage.clickRegisterButton();
  await homePage.assertYourAccountWasCreated();
});
