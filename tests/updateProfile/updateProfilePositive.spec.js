import { test } from '../_fixtures/fixtures';
import { label, severity } from 'allure-js-commons';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

const UPDATED_PROFILE = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'California',
    zipCode: '90210',
    phoneNumber: '5551234567',
};


test.beforeEach(async({page, user}) => {
await signUpUser(page, user);

});

test('Successful `Update Profile` flow test', async ({ 
    homePage,
    updateProfilePage,
    user,
    page,
}) => {

    await label('parentSuite', 'Parabank');
    await label('suite', 'Update Profile');
    await label('subSuite', 'Update Profile Positive');
    await severity('minor');
  
    await homePage.clickUpdateContactInfoButton();
    await updateProfilePage.inputFirstNameField(UPDATED_PROFILE.firstName);
    await updateProfilePage.inputLastNameField(UPDATED_PROFILE.lastName);
    await updateProfilePage.inputAdressField(UPDATED_PROFILE.address);
    await updateProfilePage.inputCityField(UPDATED_PROFILE.city);
    await updateProfilePage.inputStateField(UPDATED_PROFILE.state);
    await updateProfilePage.inputZipCodeField(UPDATED_PROFILE.zipCode);
    await updateProfilePage.inputPhoneNumberField(UPDATED_PROFILE.phoneNumber);
    await updateProfilePage.assertContactDataIsSaved(UPDATED_PROFILE);
    await updateProfilePage.clickUpdateProfileButton();
    await updateProfilePage.assertUpdateProfileFormIsVisible();
});

