import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successful `Sign out` test', async ({
  user,
  homePage,
  forgotLoginPage,
}) => {
  await homePage.clickForgotLoginInfoButton();
  await forgotLoginPage.fillFirstNameField(user.firstName);
  await forgotLoginPage.fillLastNameField(user.lastName);
  await forgotLoginPage.fillAddressField(user.address);
  await forgotLoginPage.fillCityField(user.city);
  await forgotLoginPage.fillStateField(user.state);
  await forgotLoginPage.fillZipCodeField(user.zipCode);
  await forgotLoginPage.fillSSNField(user.ssn);
  await forgotLoginPage.clickFindMyLoginInfoButton();

  await homePage.assertLoginInformationFound(user.firstName, user.lastName);
});
