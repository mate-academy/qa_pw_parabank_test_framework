import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { faker } from '@faker-js/faker';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.describe('Update Contact Info tests', () => {
  test('Update all contact information', async ({
    page,
    user,
    updateContactInfoPage,
  }) => {
    await allure.severity('critical');

    await registerUser(page, user);

    const updatedContactInfo = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      phone: faker.string.numeric(10),
    };

    await updateContactInfoPage.open();
    await updateContactInfoPage.fillContactInfo(updatedContactInfo);
    await updateContactInfoPage.clickUpdateProfileButton();
    await updateContactInfoPage.assertProfileUpdatedSuccessfully();

    // Reopen the form to verify the values were saved.
    await updateContactInfoPage.open();
    await updateContactInfoPage.assertContactInfoValues(updatedContactInfo);
  });

  test('Update phone number', async ({ page, user, updateContactInfoPage }) => {
    await allure.severity('normal');

    await registerUser(page, user);

    const updatedContactInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      phone: faker.string.numeric(10),
    };

    await updateContactInfoPage.open();
    await updateContactInfoPage.fillContactInfo(updatedContactInfo);
    await updateContactInfoPage.clickUpdateProfileButton();
    await updateContactInfoPage.assertProfileUpdatedSuccessfully();

    await updateContactInfoPage.open();
    await updateContactInfoPage.assertContactInfoValues(updatedContactInfo);
  });
});
