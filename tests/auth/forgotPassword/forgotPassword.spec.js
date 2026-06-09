import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/signUpUser';
import { label, severity } from 'allure-js-commons';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successful `Forgot Login Info` flow test', async ({
  user,
  homePage,
  lookupPage,
}) => {
  await label('parentSuite', 'Parabank');
  await label('suite', 'Auth');
  await label('subSuite', 'Forgot Password');
  await severity('normal');

  await homePage.open();
  await homePage.clickForgotLoginInfoLink();
  await lookupPage.fillFirstNameField(user.firstName);
  await lookupPage.fillLastNameField(user.lastName);
  await lookupPage.fillAddressField(user.address);
  await lookupPage.fillCityField(user.city);
  await lookupPage.fillStateField(user.state);
  await lookupPage.fillZipCodeField(user.zipCode);
  await lookupPage.fillSsnField(user.ssn);
  await lookupPage.clickFindButton();

  await lookupPage.assertUsernameTextVisible(user.username);
  await lookupPage.assertPasswordTextVisible(user.password);
  await homePage.assertWelcomeTextVisible(user.firstName, user.lastName);
});
