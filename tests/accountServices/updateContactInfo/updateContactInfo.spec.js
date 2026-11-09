import { test } from '../../_fixtures/fixtures';
import { singUpUser } from '../../../src/ui/actions/auth/SignUpUser';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page, user1 }) => {
  await allure.parentSuite('Authentication');
  await allure.suite('Update Contact Info');
  await allure.subSuite('Positive scenarios');
  await singUpUser(page, user1);
});

test('Update contact info', async ({
  page,
  homePage,
  contactInfoPage,
  user2,
}) => {
  await allure.severity(Severity.NORMAL);
  await homePage.clickUpdateContactInfoButton();
  await contactInfoPage.fillFirstNameField(user2);
  await contactInfoPage.fillLastNameField(user2);
  await contactInfoPage.fillAddressField(user2);
  await contactInfoPage.fillCityField(user2);
  await contactInfoPage.fillStateField(user2);
  await contactInfoPage.fillZipCodeField(user2);
  await contactInfoPage.fillPhoneNumberField(user2);
  await contactInfoPage.clickUpdateProfileButton();
});
