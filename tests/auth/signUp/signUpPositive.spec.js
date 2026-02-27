import { test } from '../../_fixtures/fixtures';


test('Successful `Sign up` flow test', async ({
  signUpPage,
  user,
 

}) => {

  await signUpPage.open();

  await signUpPage.fillFirstNameField(user.firstName);
  await signUpPage.fillLastNameField(user.lastName);
  await signUpPage.fillAddressStreetField(user.street);
  await signUpPage.fillAddressCityField(user.city);
  await signUpPage.fillAddressStateField(user.state);
  await signUpPage.fillAddressZipCodeField(user.zipCode);
  await signUpPage.fillPhoneNumberField(user.phone);
  await signUpPage.fillSsnField(user.ssn);
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.fillRepeatedPasswordField(user.password);

  await signUpPage.clickRegisterButton();
  await signUpPage.assertWelcomeUserHeadingIsVisible(user.username);
  
 
 
});