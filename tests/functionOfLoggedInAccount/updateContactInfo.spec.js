import { test } from '../_fixtures/fixtures';

import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

let client;

test.beforeEach(async ({ user, signUpPage }) => {
  client = user;

  await signUpPage.open();
  await signUpPage.registerUser(client);
  await signUpPage.verifySuccessRegistration(user.username);
});

const fieldsToTest = [
  'firstName',
  'lastName',
  'address',
  'city',
  'state',
  'zipCode',
  'phone',
];

for (const field of fieldsToTest) {
  test(`Update Contact Info - ${field}`, async ({
    signUpPage,
    updateProfilePage,
  }) => {
    const newData = generateNewUserData();

    await signUpPage.clickUpdateContactInfoLink();
    await updateProfilePage.assertPageTitleIsVisible();

    await updateProfilePage.updateField(field, newData[field]);
    await updateProfilePage.clickUpdateProfileButton();

    await updateProfilePage.assertProfileUpdatedMessageIsVisible();
  });
}
