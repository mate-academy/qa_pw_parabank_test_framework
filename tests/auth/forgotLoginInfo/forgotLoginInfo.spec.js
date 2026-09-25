import { test } from '../../_fixtures/fixtures';
import { SignUpPage } from '../../../src/ui/pages/auth/SignUpPage';

let client;

test.beforeEach(async ({ page, user }) => {
  client = user;
  const signUpPage = new SignUpPage(page);

  await signUpPage.open();
  await signUpPage.registerUser(client);
  await signUpPage.verifySuccessRegistration(user.username);
  await signUpPage.clickLogOut();
});

test('Forgot login info test', async ({
  signInPage,
  customerLookupPage,
  user,
}) => {
  await signInPage.open();
  await signInPage.clickLinkForgotLoginInfo();

  await customerLookupPage.assertcCustomerLookupIsVisible();
  await customerLookupPage.fillFirstNameField(user.firstName);
  await customerLookupPage.fillLastNameField(user.lastName);
  await customerLookupPage.fillAddressField(user.address);
  await customerLookupPage.fillCityField(user.city);
  await customerLookupPage.fillStateField(user.state);
  await customerLookupPage.fillZipCodeField(user.zipCode);
  await customerLookupPage.fillSsnField(user.ssn);
  await customerLookupPage.clickSearchButton();
  await customerLookupPage.assertSuccessSearchMessageIsVisible();
  await customerLookupPage.assertUsernameIsVisible(user.username);
  await customerLookupPage.assertPasswordIsVisible(user.password);
  await customerLookupPage.assertUserIsLoggedIn();
});
