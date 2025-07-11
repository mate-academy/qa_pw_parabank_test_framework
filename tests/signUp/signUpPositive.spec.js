import { test } from '../_fixtures/fixtures';

test('Successful `Sign Up` flow test', async ({ user, signUpPage }) => {
  await signUpPage.open();
  await signUpPage.fillFirstNameField(user.firstName);
  await signUpPage.fillLastNameField(user.lastName);
  await signUpPage.fillAddressField(user.address);
  await signUpPage.fillCityField(user.city);
  await signUpPage.fillStateField(user.state);
  await signUpPage.fillZipCodeField(user.zipCode);
  await signUpPage.fillPhoneField(user.phone);
  await signUpPage.fillSsnField(user.ssn);
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.confirmPasswordField(user.password);
  await signUpPage.clickRegisterButton();
  await signUpPage.waitForSuccessMessage(user.username);
});

test('Successful `Sign Up` flow without phone number test', async ({
  user,
  signUpPage,
}) => {
  test.info().annotations.push({ type: 'severity', description: 'critical' });
  await signUpPage.open();
  await signUpPage.fillFirstNameField(user.firstName);
  await signUpPage.fillLastNameField(user.lastName);
  await signUpPage.fillAddressField(user.address);
  await signUpPage.fillCityField(user.city);
  await signUpPage.fillStateField(user.state);
  await signUpPage.fillZipCodeField(user.zipCode);
  await signUpPage.fillSsnField(user.ssn);
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.confirmPasswordField(user.password);
  await signUpPage.clickRegisterButton();
  await signUpPage.waitForSuccessMessage(user.username);
});
