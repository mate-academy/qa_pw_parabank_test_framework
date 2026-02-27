import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';





test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  

});

test('Successful `Update Contact Info` flow test', async ({ 
  page,
  accountOverviewPage,
  updateContactInfoPage,
}) => {
  const newUserInfo = generateNewUserData();
  
  
  await accountOverviewPage.clickAccountsOverviewLink();


  await accountOverviewPage.clickUpdateContactInfo();
  await page.waitForTimeout(3000);


  await updateContactInfoPage.fillFirstNameField(newUserInfo.firstName);
  await updateContactInfoPage.fillLastNameField(newUserInfo.lastName);
  await updateContactInfoPage.fillAddressStreetField(newUserInfo.street);
  await updateContactInfoPage.fillAddressCityFieldField(newUserInfo.city);
  await updateContactInfoPage.fillAddressStateFieldField(newUserInfo.state);
  await updateContactInfoPage.fillAddressZipCodeFieldField(newUserInfo.zipCode);
  await updateContactInfoPage.fillPhoneNumberFieldField(newUserInfo.phone);

  await updateContactInfoPage.clickUpdateProfile();

  
 
  
  await updateContactInfoPage.clickUpdateContactInfo();


  await updateContactInfoPage.assertFirstNameFieldValue(newUserInfo.firstName);
  await updateContactInfoPage.assertLastNameFieldValue(newUserInfo.lastName);
  await updateContactInfoPage.assertAddressStreetFieldValue(newUserInfo.street);
  await updateContactInfoPage.assertAddressCityFieldValue(newUserInfo.city);
  await updateContactInfoPage.assertAddressStateFieldValue(newUserInfo.state);
  await updateContactInfoPage.assertAddressZipCodeFieldValue(newUserInfo.zipCode);
  await updateContactInfoPage.assertPhoneNumberFieldValue(newUserInfo.phone);








});