import { test } from '../../../_fixtures/fixtures';

import { SignInPage } from '../../../../src/ui/pages/SignInPage';
import { ForgotLoginInfoPage } from '../../../../src/ui/pages/ForgotLoginInfoPage';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

let signInPage;
let forgotLoginInfoPage;

test.use({ contextsNumber: 2 });

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);

  signInPage = new SignInPage(pages[1]);
  forgotLoginInfoPage = new ForgotLoginInfoPage(pages[1]);
});

test.describe('Forgot login info positive tests', () => {
  test('User can recover login information', async ({ user }) => {
    await signInPage.open();

    await signInPage.clickForgotLoginInfoLink();

    await forgotLoginInfoPage.assertCustomerLookupTitleIsVisible();

    await forgotLoginInfoPage.fillFirstNameInput(user.firstName);
    await forgotLoginInfoPage.fillLastNameInput(user.lastName);
    await forgotLoginInfoPage.fillAddressInput(user.address);
    await forgotLoginInfoPage.fillCityInput(user.city);
    await forgotLoginInfoPage.fillStateInput(user.state);
    await forgotLoginInfoPage.fillZipCodeInput(user.zipCode);
    await forgotLoginInfoPage.fillSsnInput(user.ssn);

    await forgotLoginInfoPage.clickFindMyLoginInfoButton();

    await forgotLoginInfoPage.assertSuccessMessageIsVisible();
    await forgotLoginInfoPage.assertLoginInformationIsCorrect(
      user.username,
      user.password,
    );
  });
});
