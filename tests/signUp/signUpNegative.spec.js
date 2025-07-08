import { test } from '../_fixtures/fixtures';

test('`Sign Up` flow without confirm password test', async ({
  user,
  signUpPage,
}) => {
  test.info().annotations.push({ type: 'severity', description: 'normal' });
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
  await signUpPage.clickRegisterButton();
  await signUpPage.confirmErrorMessageIsDisplayed(
    'Password confirmation is required.',
  );
});

test('`Sign Up` flow with exists user', async ({ user, signUpPage }) => {
  test.info().annotations.push({ type: 'severity', description: 'normal' });
  await signUpPage.open();
  await signUpPage.fillFirstNameField('alanis');
  await signUpPage.fillLastNameField('breitenberg');
  await signUpPage.fillAddressField(user.address);
  await signUpPage.fillCityField(user.city);
  await signUpPage.fillStateField(user.state);
  await signUpPage.fillZipCodeField(user.zipCode);
  await signUpPage.fillPhoneField(user.phone);
  await signUpPage.fillSsnField(user.ssn);
  await signUpPage.fillUsernameField('alanis_breitenberg');
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.confirmPasswordField(user.password);
  await signUpPage.clickRegisterButton();
  await signUpPage.checkUserExists('This username already exists.');
});
