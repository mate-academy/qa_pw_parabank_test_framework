import { faker } from '@faker-js/faker';

import { test } from '../../_fixtures/fixtures';

import { UpdateContactInfoPage } from '../../../src/ui/pages/UpdateContactInfoPage';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';

import {
  EMPTY_FIRST_NAME_MESSAGE,
  EMPTY_LAST_NAME_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIP_CODE_MESSAGE,
} from '../../../src/ui/constants/updateContactInfoErrorMessages';

let updateContactInfoPage;

async function fillValidContactInfo(data = {}) {
  await updateContactInfoPage.fillFirstNameInput(
    data.firstName ?? faker.person.firstName(),
  );

  await updateContactInfoPage.fillLastNameInput(
    data.lastName ?? faker.person.lastName(),
  );

  await updateContactInfoPage.fillAddressInput(
    data.address ?? faker.location.streetAddress(),
  );

  await updateContactInfoPage.fillCityInput(data.city ?? faker.location.city());

  await updateContactInfoPage.fillStateInput(
    data.state ?? faker.location.state(),
  );

  await updateContactInfoPage.fillZipCodeInput(
    data.zipCode ?? faker.location.zipCode(),
  );

  await updateContactInfoPage.fillPhoneNumberInput(
    data.phoneNumber ?? faker.phone.number(),
  );
}

const emptyRequiredFields = [
  {
    fieldName: 'First Name',
    data: { firstName: '' },
    assertError: async () => {
      await updateContactInfoPage.assertFirstNameErrorContainsText(
        EMPTY_FIRST_NAME_MESSAGE,
      );
    },
  },
  {
    fieldName: 'Last Name',
    data: { lastName: '' },
    assertError: async () => {
      await updateContactInfoPage.assertLastNameErrorContainsText(
        EMPTY_LAST_NAME_MESSAGE,
      );
    },
  },
  {
    fieldName: 'Address',
    data: { address: '' },
    assertError: async () => {
      await updateContactInfoPage.assertAddressErrorContainsText(
        EMPTY_ADDRESS_MESSAGE,
      );
    },
  },
  {
    fieldName: 'City',
    data: { city: '' },
    assertError: async () => {
      await updateContactInfoPage.assertCityErrorContainsText(
        EMPTY_CITY_MESSAGE,
      );
    },
  },
  {
    fieldName: 'State',
    data: { state: '' },
    assertError: async () => {
      await updateContactInfoPage.assertStateErrorContainsText(
        EMPTY_STATE_MESSAGE,
      );
    },
  },
  {
    fieldName: 'Zip Code',
    data: { zipCode: '' },
    assertError: async () => {
      await updateContactInfoPage.assertZipCodeErrorContainsText(
        EMPTY_ZIP_CODE_MESSAGE,
      );
    },
  },
];

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);

  updateContactInfoPage = new UpdateContactInfoPage(pages[0]);

  await updateContactInfoPage.clickUpdateContactInfoLink();
  await updateContactInfoPage.assertUpdateProfileTitleIsVisible();
});

test.describe('Update Contact Info tests', () => {
  test('User can update contact information', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number();

    await updateContactInfoPage.fillFirstNameInput(firstName);
    await updateContactInfoPage.fillLastNameInput(lastName);
    await updateContactInfoPage.fillAddressInput(address);
    await updateContactInfoPage.fillCityInput(city);
    await updateContactInfoPage.fillStateInput(state);
    await updateContactInfoPage.fillZipCodeInput(zipCode);
    await updateContactInfoPage.fillPhoneNumberInput(phoneNumber);

    await updateContactInfoPage.clickUpdateProfileButton();

    await updateContactInfoPage.assertProfileUpdatedSuccessfully();
  });

  for (const { fieldName, data, assertError } of emptyRequiredFields) {
    test(`User cannot update profile with empty ${fieldName} field`, async () => {
      await fillValidContactInfo(data);

      await updateContactInfoPage.clickUpdateProfileButton();

      await assertError();
    });
  }
});
