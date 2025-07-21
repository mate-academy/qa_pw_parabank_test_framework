import { test } from '../../_fixtures/fixtures'
import { WELCOME_TEXT } from '../../../src/common/test data/constants';

test('Successful `Sign up` flow test', async ({
  signUpPage,
  user,
  homePage
}) => {
  await signUpPage.open();
  await signUpPage.fillFirstNameField(user.firstname);
  await signUpPage.fillLastNameField(user.lastname);
  await signUpPage.fillAddressField(user.address);
  await signUpPage.fillCityField(user.city);
  await signUpPage.fillStateField(user.state);
  await signUpPage.fillZipCodeField(user.zip);
  await signUpPage.fillPhoneNumberField(user.phone);
  await signUpPage.fillSSNField(user.ssn);
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.fillConfirmPasswordField(user.password);
  await signUpPage.clickRegisterButton();

  await homePage.assertUsername(user.username);
  await homePage.assertWelcomeText(WELCOME_TEXT);
});
