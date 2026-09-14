import { test } from '../../_fixtures/fixtures';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { ForgotLoginInfo } from '../../../src/ui/pages/auth/ForgotLoginInfoPage';
import { SIGN_UP_FIELDS } from '../../../src/ui/constants/signUpFields';

let signInPage;
let homePage;
let forgotInfoPage;

test.use({ contextsNumber: 2 });

test.beforeEach(async ({ pages, user }) => {
  await signUpUser(pages[0], user);

  signInPage = new SignInPage(pages[1]);
  homePage = new HomePage(pages[1]);
  forgotInfoPage = new ForgotLoginInfo(pages[1]);
});

test('Forgot `Login Info` flow test', async ({ user }) => {
  await signInPage.open();
  await signInPage.clickForgotLoginInfo();
  await forgotInfoPage.fillField(SIGN_UP_FIELDS.FIRST_NAME, user.firstName);
  await forgotInfoPage.fillField(SIGN_UP_FIELDS.LAST_NAME, user.lastName);
  await forgotInfoPage.fillField(
    SIGN_UP_FIELDS.ADDRESS_STREET,
    user.addressStreet,
  );
  await forgotInfoPage.fillField(SIGN_UP_FIELDS.ADDRESS_CITY, user.addressCity);
  await forgotInfoPage.fillField(
    SIGN_UP_FIELDS.ADDRESS_STATE,
    user.addressState,
  );
  await forgotInfoPage.fillField(
    SIGN_UP_FIELDS.ADDRESS_ZIP_CODE,
    user.addressZipCode,
  );
  await forgotInfoPage.fillField(SIGN_UP_FIELDS.SSN, user.snn);
  await forgotInfoPage.clickSumbitButton();

  await homePage.assertYourWelcomeMessageIsVisible(user);
});
