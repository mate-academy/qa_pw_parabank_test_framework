import { test, expect } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { generateUserData } from '../../src/common/helpers/dataHelpers';
import {
  updateUserContactInfo,
  REQUIRED_CONTACT_FIELDS,
} from '../../src/ui/actions/accountServices/updateContactInfo';
import { EPICS, FEATURES, SEVERITY } from '../../src/constants/index.js';

test.describe('Update Contact Info Tests', () => {
  test('User can update contact information', async ({
    loggedInUser,
    updateContactInfoPage,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.UPDATE_CONTACT);
    await allure.story('User is able to update contact information');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('positive', 'update', 'profile');

    const newData = generateUserData();

    await updateUserContactInfo(updateContactInfoPage, newData);

    await updateContactInfoPage.assertProfileUpdated();
  });

  test.describe('Required Fields Validation', () => {
    REQUIRED_CONTACT_FIELDS.forEach(({ field, errorField }) => {
      test(`User cannot update with empty ${field}`, async ({
        loggedInUser,
        updateContactInfoPage,
        newUserData,
      }) => {
        await allure.epic(EPICS.ACCOUNT_SERVICES);
        await allure.feature(FEATURES.UPDATE_CONTACT);
        await allure.story('User cannot update with empty required fields');
        await allure.severity(SEVERITY.NORMAL);
        await allure.tag('negative', 'validation', 'profile');

        await updateContactInfoPage.open();
        await updateContactInfoPage.fillUpdateFormExcept(newUserData, field);
        await updateContactInfoPage.clickUpdateProfileButton();

        await updateContactInfoPage.assertInlineErrorShown(errorField);
      });
    });
  });
});
