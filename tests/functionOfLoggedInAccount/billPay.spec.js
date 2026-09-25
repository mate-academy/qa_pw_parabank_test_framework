import { test } from '../_fixtures/fixtures';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';

let client;

test.beforeEach(async ({ page, user }) => {
  client = user;
  const signUpPage = new SignUpPage(page);

  await signUpPage.open();
  await signUpPage.registerUser(client);
  await signUpPage.verifySuccessRegistration(user.username);
});

test('Bill Pay', async ({ signUpPage, billPayPage }) => {
  await signUpPage.clickbillPayLink();
  await billPayPage.assertPageTitleIsVisible();

  const payeeName = 'John Doe';
  const amount = '1';

  await billPayPage.fillPayeeNameField(payeeName);
  await billPayPage.fillAddressField('123 Main St');
  await billPayPage.fillCityField('Springfield');
  await billPayPage.fillStateField('IL');
  await billPayPage.fillZipCodeField('62701');
  await billPayPage.fillPhoneField('555-1234');
  await billPayPage.fillAccountNumberField('12345');
  await billPayPage.fillVerifyAccountNumberField('12345');
  await billPayPage.fillAmountField(amount);

  await billPayPage.clickSendPaymentButton();

  await billPayPage.assertSuccessfulBillPaymentIsVisible();
  await billPayPage.assertSuccessfulPaymentDetails(payeeName, amount);
});
