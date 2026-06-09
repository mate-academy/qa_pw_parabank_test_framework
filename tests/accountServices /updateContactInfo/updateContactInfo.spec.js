import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/signUpUser';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { label, severity } from 'allure-js-commons';

const NEW_USER = generateNewUserData();

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successful `Update Contact Info` flow test', async ({
  homePage,
  updateInfoPage,
}) => {
  await label('parentSuite', 'Parabank');
  await label('suite', 'Account Services');
  await label('subSuite', 'Update Contact Info');
  await severity('normal');

  await homePage.open();
  await homePage.clickUpdateContactInfoLink();
  await updateInfoPage.fillFirstNameField(NEW_USER.firstName);
  await updateInfoPage.fillLastNameField(NEW_USER.lastName);
  await updateInfoPage.fillAddressField(NEW_USER.address);
  await updateInfoPage.fillCityField(NEW_USER.city);
  await updateInfoPage.fillStateField(NEW_USER.state);
  await updateInfoPage.fillZipCodeField(NEW_USER.zipCode);
  await updateInfoPage.fillPhoneField(NEW_USER.phone);
  await updateInfoPage.clickUpdateInfoButton();

  await updateInfoPage.assertSuccessTextShown();
});
