import { test } from '../../../_fixtures/fixtures';
import { SIGN_UP_FIELDS } from '../../../../src/ui/constants/signUpFields';

test('Successful `Sign up` flow test', async ({
  user,
  signUpPage,
  homePage,
}) => {
  await signUpPage.open();
  await signUpPage.fillField(SIGN_UP_FIELDS.FIRST_NAME, user.firstName);
  await signUpPage.fillField(SIGN_UP_FIELDS.LAST_NAME, user.lastName);
  await signUpPage.fillField(SIGN_UP_FIELDS.ADDRESS_STREET, user.addressStreet);
  await signUpPage.fillField(SIGN_UP_FIELDS.ADDRESS_CITY, user.addressCity);
  await signUpPage.fillField(SIGN_UP_FIELDS.ADDRESS_STATE, user.addressState);
  await signUpPage.fillField(
    SIGN_UP_FIELDS.ADDRESS_ZIP_CODE,
    user.addressZipCode,
  );
  await signUpPage.fillField(SIGN_UP_FIELDS.PHONE_NUMBER, user.phoneNumber);
  await signUpPage.fillField(SIGN_UP_FIELDS.SSN, user.snn);
  await signUpPage.fillField(SIGN_UP_FIELDS.USERNAME, user.username);
  await signUpPage.fillField(SIGN_UP_FIELDS.PASSWORD, user.password);
  await signUpPage.fillRepeatPasswordField(user.password);
  await signUpPage.clickSignUpButton();

  await homePage.assertYourWelcomeMessageIsVisible(user);
});
