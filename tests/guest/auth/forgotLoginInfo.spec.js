import { test } from '../../_fixtures/fixtures';
import {
  FIRST_NAME_ERROR_MESSAGE,
  LAST_NAME_ERROR_MESSAGE,
  ADDRESS_ERROR_MESSAGE,
  CITY_ERROR_MESSAGE,
  STATE_ERROR_MESSAGE,
  ZIP_CODE_ERROR_MESSAGE,
  SSN_ERROR_MESSAGE,
} from '../../../src/ui/constants/authErrorMessages';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { CustomerLookupPage } from '../../../src/ui/pages/CustomerLookupPage';

test.describe('Forgot login info tests', () => {
  test('Forgot login info is visible test', async ({ homePage }) => {
    await homePage.open();
    await homePage.assertForgotLoginInfoLinkIsVisible();
  });

  test('Forgot login info error messages test', async ({ homePage, customerLookupPage }) => {
    await homePage.open();
    await homePage.clickForgotLoginInfoLink();
    await customerLookupPage.clickFindMyLoginInfoButton();
    await customerLookupPage.assertFirstNameErrorMessage(FIRST_NAME_ERROR_MESSAGE);
    await customerLookupPage.assertLastNameErrorMessage(LAST_NAME_ERROR_MESSAGE);
    await customerLookupPage.assertAddressErrorMessage(ADDRESS_ERROR_MESSAGE);
    await customerLookupPage.assertCityErrorMessage(CITY_ERROR_MESSAGE);
    await customerLookupPage.assertStateErrorMessage(STATE_ERROR_MESSAGE);
    await customerLookupPage.assertZipCodeErrorMessage(ZIP_CODE_ERROR_MESSAGE);
    await customerLookupPage.assertSsnErrorMessage(SSN_ERROR_MESSAGE);
  });
  test('Forgot login info non valid user data test', async ({ user, homePage, customerLookupPage }) => {
    await homePage.open();
    await homePage.clickForgotLoginInfoLink();
    await customerLookupPage.clickFindMyLoginInfoButton();
    await customerLookupPage.fillFirstNameField(user.firstName);
    await customerLookupPage.fillLastNameField(user.lastName);
    await customerLookupPage.fillAddressField(user.address);
    await customerLookupPage.fillCityField(user.city);
    await customerLookupPage.fillStateField(user.state);
    await customerLookupPage.fillZipCodeField(user.zipCode);
    await customerLookupPage.fillSsnField(user.ssn);
    await customerLookupPage.clickFindMyLoginInfoButton();
    await customerLookupPage.assertLoginMessage('The customer information provided could not be found.');
  });
});

  test.describe('Forgot login info positive tests', () => {
    test.use({ contextsNumber: 2 });

  test ('Forgot login info valid user data test', async ({ pages, user }) => {
    await registerUser(pages[0], user);

    const homePage = new HomePage(pages[1]);
    const customerLookupPage = new CustomerLookupPage(pages[1]);
    await homePage.open(pages[1]);
    await homePage.clickForgotLoginInfoLink();
    await customerLookupPage.clickFindMyLoginInfoButton();
    await customerLookupPage.fillFirstNameField(user.firstName);
    await customerLookupPage.fillLastNameField(user.lastName);
    await customerLookupPage.fillAddressField(user.address);
    await customerLookupPage.fillCityField(user.city);
    await customerLookupPage.fillStateField(user.state);
    await customerLookupPage.fillZipCodeField(user.zipCode);
    await customerLookupPage.fillSsnField(user.ssn);
    await customerLookupPage.clickFindMyLoginInfoButton();
    await customerLookupPage.assertLoginMessage('Your login information was located successfully. You are now logged in. ');
  });
});