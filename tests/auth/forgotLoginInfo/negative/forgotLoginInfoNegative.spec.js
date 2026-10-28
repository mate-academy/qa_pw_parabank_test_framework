import { test } from '../../../_fixtures/fixtures';

import { SignInPage } from '../../../../src/ui/pages/SignInPage';
import { ForgotLoginInfoPage } from '../../../../src/ui/pages/ForgotLoginInfoPage';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

import {
  CUSTOMER_NOT_FOUND_MESSAGE,
  EMPTY_FIRST_NAME_MESSAGE,
  EMPTY_LAST_NAME_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIP_CODE_MESSAGE,
  EMPTY_SSN_MESSAGE,
} from '../../../../src/ui/constants/forgotLoginInfoErrorMessages';

test.use({ contextsNumber: 2 });
const testParameters = [
  {
    field: 'firstName',
    message: EMPTY_FIRST_NAME_MESSAGE,
    title: 'empty first name',
    assertError: async (forgotLoginInfoPage, message) => {
      await forgotLoginInfoPage.assertFirstNameErrorContainsText(message);
    },
  },
  {
    field: 'lastName',
    message: EMPTY_LAST_NAME_MESSAGE,
    title: 'empty last name',
    assertError: async (forgotLoginInfoPage, message) => {
      await forgotLoginInfoPage.assertLastNameErrorContainsText(message);
    },
  },
  {
    field: 'address',
    message: EMPTY_ADDRESS_MESSAGE,
    title: 'empty address',
    assertError: async (forgotLoginInfoPage, message) => {
      await forgotLoginInfoPage.assertAddressErrorContainsText(message);
    },
  },
  {
    field: 'city',
    message: EMPTY_CITY_MESSAGE,
    title: 'empty city',
    assertError: async (forgotLoginInfoPage, message) => {
      await forgotLoginInfoPage.assertCityErrorContainsText(message);
    },
  },
  {
    field: 'state',
    message: EMPTY_STATE_MESSAGE,
    title: 'empty state',
    assertError: async (forgotLoginInfoPage, message) => {
      await forgotLoginInfoPage.assertStateErrorContainsText(message);
    },
  },
  {
    field: 'zipCode',
    message: EMPTY_ZIP_CODE_MESSAGE,
    title: 'empty zip code',
    assertError: async (forgotLoginInfoPage, message) => {
      await forgotLoginInfoPage.assertZipCodeErrorContainsText(message);
    },
  },
  {
    field: 'ssn',
    message: EMPTY_SSN_MESSAGE,
    title: 'empty SSN',
    assertError: async (forgotLoginInfoPage, message) => {
      await forgotLoginInfoPage.assertSsnErrorContainsText(message);
    },
  },
];

async function fillCustomerDataExcept(forgotLoginInfoPage, user, fieldToSkip) {
  if (fieldToSkip !== 'firstName') {
    await forgotLoginInfoPage.fillFirstNameInput(user.firstName);
  }

  if (fieldToSkip !== 'lastName') {
    await forgotLoginInfoPage.fillLastNameInput(user.lastName);
  }

  if (fieldToSkip !== 'address') {
    await forgotLoginInfoPage.fillAddressInput(user.address);
  }

  if (fieldToSkip !== 'city') {
    await forgotLoginInfoPage.fillCityInput(user.city);
  }

  if (fieldToSkip !== 'state') {
    await forgotLoginInfoPage.fillStateInput(user.state);
  }

  if (fieldToSkip !== 'zipCode') {
    await forgotLoginInfoPage.fillZipCodeInput(user.zipCode);
  }

  if (fieldToSkip !== 'ssn') {
    await forgotLoginInfoPage.fillSsnInput(user.ssn);
  }
}

test.describe('Forgot login info negative tests', () => {
  test('User cannot recover login information with unregistered customer data', async ({
    signInPage,
    forgotLoginInfoPage,
    user,
  }) => {
    await signInPage.open();

    await signInPage.clickForgotLoginInfoLink();

    await forgotLoginInfoPage.fillFirstNameInput(user.firstName);
    await forgotLoginInfoPage.fillLastNameInput(user.lastName);
    await forgotLoginInfoPage.fillAddressInput(user.address);
    await forgotLoginInfoPage.fillCityInput(user.city);
    await forgotLoginInfoPage.fillStateInput(user.state);
    await forgotLoginInfoPage.fillZipCodeInput(user.zipCode);
    await forgotLoginInfoPage.fillSsnInput(user.ssn);

    await forgotLoginInfoPage.clickFindMyLoginInfoButton();

    await forgotLoginInfoPage.assertErrorMessageContainsText(
      CUSTOMER_NOT_FOUND_MESSAGE,
    );
  });

  testParameters.forEach(({ field, message, title, assertError }) => {
    test(`User cannot recover login information with ${title}`, async ({
      signInPage,
      forgotLoginInfoPage,
      user,
    }) => {
      await signInPage.open();

      await signInPage.clickForgotLoginInfoLink();

      await fillCustomerDataExcept(forgotLoginInfoPage, user, field);

      await forgotLoginInfoPage.clickFindMyLoginInfoButton();

      await assertError(forgotLoginInfoPage, message);
    });
  });

  test('User cannot recover login information with invalid SSN', async ({
    pages,
    user,
  }) => {
    await registerUser(pages[0], user);

    const signInPage = new SignInPage(pages[1]);
    const forgotLoginInfoPage = new ForgotLoginInfoPage(pages[1]);

    await signInPage.open();

    await signInPage.clickForgotLoginInfoLink();

    await forgotLoginInfoPage.fillFirstNameInput(user.firstName);
    await forgotLoginInfoPage.fillLastNameInput(user.lastName);
    await forgotLoginInfoPage.fillAddressInput(user.address);
    await forgotLoginInfoPage.fillCityInput(user.city);
    await forgotLoginInfoPage.fillStateInput(user.state);
    await forgotLoginInfoPage.fillZipCodeInput(user.zipCode);
    await forgotLoginInfoPage.fillSsnInput('000000000');

    await forgotLoginInfoPage.clickFindMyLoginInfoButton();

    await forgotLoginInfoPage.assertErrorMessageContainsText(
      CUSTOMER_NOT_FOUND_MESSAGE,
    );
  });
});
