import { generateUserData } from "../../../src/common/testData/generateUserInfo";
import { test  } from '../../_fixtures/fixtures';
import {
  EMPTY_FIRST_NAME_MESSAGE,
  EMPTY_LAST_NAME_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIPCODE_MESSAGE,
} from "../../../src/ui/constants/registrationErrors";
import { severity, Severity } from 'allure-js-commons';

const requiredFieldCases = [
  { description: 'first name is empty', 
    overrides: { firstName: '' }, 
    expectedError: EMPTY_FIRST_NAME_MESSAGE 
  },
  { description: 'last name is empty', 
    overrides: { lastName: '' }, 
    expectedError: EMPTY_LAST_NAME_MESSAGE 
  },
  { description: 'address is empty', 
    overrides: { address: '' }, 
    expectedError: EMPTY_ADDRESS_MESSAGE 
  },
  { description: 'city is empty', 
    overrides: { city: '' }, 
    expectedError: EMPTY_CITY_MESSAGE 
  },
  { description: 'state is empty', 
    overrides: { state: '' }, 
    expectedError: EMPTY_STATE_MESSAGE 
  },
  { description: 'zip code is empty', 
    overrides: { zipCode: '' }, 
    expectedError: EMPTY_ZIPCODE_MESSAGE 
  },
];

for (const testCase of requiredFieldCases) {
  // eslint-disable-next-line max-len
  test(`User Info update fails when ${testCase.description}`, async ({ existingUser, updateContactInfoPage }) => {
    await severity(Severity.NORMAL);
    const userData = generateUserData(testCase.overrides);
    await updateContactInfoPage.open();
    await updateContactInfoPage.fillForm(userData);
    await updateContactInfoPage.clickUpdateProfileButton();
    await updateContactInfoPage.assertErrorMessageIsShown(testCase.expectedError);
  });
}