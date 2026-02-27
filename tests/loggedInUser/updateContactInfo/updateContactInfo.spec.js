import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';





test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  

});

test('Successful `Update Contact Info` flow test', async ({ 
  
  accountOverviewPage,
  updateContactInfoPage,
}) => {
  const newUserInfo = generateNewUserData();
  
  
  await accountOverviewPage.clickAccountsOverviewLink();


  await accountOverviewPage.clickUpdateContactInfo();
  await updateContactInfoPage.assertUpdateContactInfoFormIsVisible();


  await updateContactInfoPage.fillFirstNameField(newUserInfo.firstName);
  await updateContactInfoPage.fillLastNameField(newUserInfo.lastName);
  await updateContactInfoPage.fillAddressStreetField(newUserInfo.street);
  await updateContactInfoPage.fillAddressCityField(newUserInfo.city);
  await updateContactInfoPage.fillAddressStateField(newUserInfo.state);
  await updateContactInfoPage.fillAddressZipCodeField(newUserInfo.zipCode);
  await updateContactInfoPage.fillPhoneNumberField(newUserInfo.phone);

  await updateContactInfoPage.clickUpdateProfile();
  await updateContactInfoPage.assertProfileUpdatedHeaderIsVisible();
  
 
  
  await updateContactInfoPage.clickUpdateContactInfo();


  await updateContactInfoPage.assertFirstNameFieldValue(newUserInfo.firstName);
  await updateContactInfoPage.assertLastNameFieldValue(newUserInfo.lastName);
  await updateContactInfoPage.assertAddressStreetFieldValue(newUserInfo.street);
  await updateContactInfoPage.assertAddressCityFieldValue(newUserInfo.city);
  await updateContactInfoPage.assertAddressStateFieldValue(newUserInfo.state);
  await updateContactInfoPage.assertAddressZipCodeFieldValue(newUserInfo.zipCode);
  await updateContactInfoPage.assertPhoneNumberFieldValue(newUserInfo.phone);








});