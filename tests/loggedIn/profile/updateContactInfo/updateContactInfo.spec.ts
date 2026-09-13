import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { LEFT_PANEL_BUTTONS } from '../../../../src/ui/constants/leftPanelButtons';
import { UPDATE_USER_FIELDS } from '../../../../src/ui/constants/updateUserFields';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';

const updateUser = generateNewUserData();

const testParameters = [
  {
    nameOfTheField: UPDATE_USER_FIELDS.FIRST_NAME,
    userProperty: updateUser.firstName,
  },
  {
    nameOfTheField: UPDATE_USER_FIELDS.LAST_NAME,
    userProperty: updateUser.lastName,
  },
  {
    nameOfTheField: UPDATE_USER_FIELDS.ADDRESS_STREET,
    userProperty: updateUser.addressStreet,
  },
  {
    nameOfTheField: UPDATE_USER_FIELDS.ADDRESS_CITY,
    userProperty: updateUser.addressCity,
  },
  {
    nameOfTheField: UPDATE_USER_FIELDS.ADDRESS_STATE,
    userProperty: updateUser.addressState,
  },
  {
    nameOfTheField: UPDATE_USER_FIELDS.ADDRESS_ZIP_CODE,
    userProperty: updateUser.addressZipCode,
  },
  {
    nameOfTheField: UPDATE_USER_FIELDS.PHONE_NUMBER,
    userProperty: updateUser.phoneNumber,
  },
];

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test.describe(`Successful 'Update Contact Info' flow test`, () => {
  testParameters.forEach(({ nameOfTheField, userProperty }) => {
    test(`Successful 'Updated ${nameOfTheField} Info' flow test`, async ({
      homePage,
      updateProfilePage,
      page,
    }) => {
      await homePage.open();
      await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.UPDATE_PROFILE);
      await page.reload();
      await page.waitForTimeout(5000);
      await updateProfilePage.fillField(nameOfTheField, userProperty);
      await updateProfilePage.clickUpdateProfileButton();
      await updateProfilePage.assertProfileUpdatedMessage();
      await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.UPDATE_PROFILE);
      await updateProfilePage.assertUpdatedValue(nameOfTheField, userProperty);
    });
  });
});
