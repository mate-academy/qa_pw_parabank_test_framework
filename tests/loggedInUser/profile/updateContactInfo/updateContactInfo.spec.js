import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

test('User can update contact information', async ({
  loggedInUser,
  updateContactInfoPage,
  updatedContactData,
}) => {
  await allure.severity('critical');

  await updateContactInfoPage.open();
  await updateContactInfoPage.updateContactInformation(updatedContactData);
  await updateContactInfoPage.submitContactInformation();
  await updateContactInfoPage.assertProfileWasUpdated();

  await updateContactInfoPage.open();
  await updateContactInfoPage.assertContactInformationIsSaved(
    updatedContactData,
  );
});
