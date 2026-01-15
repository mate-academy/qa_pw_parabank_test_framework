import * as allure from 'allure-js-commons';

export async function updateUserContactInfo(updateContactInfoPage, userData) {
  return await allure.step(
    'Update user contact information',
    async () => {
      await updateContactInfoPage.open();
      await updateContactInfoPage.fillUpdateForm(userData);
      await updateContactInfoPage.clickUpdateProfileButton();
    },
  );
}

export const REQUIRED_CONTACT_FIELDS = [
  { field: 'firstName', errorField: 'firstName' },
  { field: 'lastName', errorField: 'lastName' },
  { field: 'address', errorField: 'address' },
  { field: 'city', errorField: 'city' },
  { field: 'state', errorField: 'state' },
  { field: 'zipCode', errorField: 'zipCode' },
];
