import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../src/common/helpers/testData/generateNewUserData';
import * as UpdateContactInfoErrorMessages from '../../src/ui/constants/updateContactInfoErrorMessages';

const profile = generateNewUserData();

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

const testParameters = [
  {
    firstName: '',
    lastName: profile.lastName,
    address: profile.address,
    city: profile.city,
    state: profile.state,
    zipCode: profile.zipCode,
    phone: profile.phone,
    message: UpdateContactInfoErrorMessages.EMPTY_FIRST_NAME_MESSAGE,
    title: 'empty first name',
  },
  {
    firstName: profile.firstName,
    lastName: '',
    address: profile.address,
    city: profile.city,
    state: profile.state,
    zipCode: profile.zipCode,
    phone: profile.phone,
    message: UpdateContactInfoErrorMessages.EMPTY_LAST_NAME_MESSAGE,
    title: 'empty last name',
  },
  {
    firstName: profile.firstName,
    lastName: profile.lastName,
    address: '',
    city: profile.city,
    state: profile.state,
    zipCode: profile.zipCode,
    phone: profile.phone,
    message: UpdateContactInfoErrorMessages.EMPTY_ADDRESS_MESSAGE,
    title: 'empty address',
  },
  {
    firstName: profile.firstName,
    lastName: profile.lastName,
    address: profile.address,
    city: '',
    state: profile.state,
    zipCode: profile.zipCode,
    phone: profile.phone,
    message: UpdateContactInfoErrorMessages.EMPTY_CITY_MESSAGE,
    title: 'empty city',
  },
  {
    firstName: profile.firstName,
    lastName: profile.lastName,
    address: profile.address,
    city: profile.city,
    state: '',
    zipCode: profile.zipCode,
    phone: profile.phone,
    message: UpdateContactInfoErrorMessages.EMPTY_STATE_MESSAGE,
    title: 'empty state',
  },
  {
    firstName: profile.firstName,
    lastName: profile.lastName,
    address: profile.address,
    city: profile.city,
    state: profile.state,
    zipCode: '',
    phone: profile.phone,
    message: UpdateContactInfoErrorMessages.EMPTY_ZIP_CODE_MESSAGE,
    title: 'empty zip code',
  },
];

testParameters.forEach(
  ({ firstName, lastName, address, city, state, zipCode, phone, message, title }) => {
    test.describe('Update contact info negative tests', () => {
      test(`Update contact info with ${title}`, async ({ updateContactInfoPage }) => {
        await updateContactInfoPage.open();
        await updateContactInfoPage.fillFirstNameField(firstName);
        await updateContactInfoPage.fillLastNameField(lastName);
        await updateContactInfoPage.fillAddressField(address);
        await updateContactInfoPage.fillCityField(city);
        await updateContactInfoPage.fillStateField(state);
        await updateContactInfoPage.fillZipCodeField(zipCode);
        await updateContactInfoPage.fillPhoneField(phone);
        await updateContactInfoPage.clickUpdateProfileButton();
        await updateContactInfoPage.assertErrorMessageContainsText(message);
      });
    });
  },
);
