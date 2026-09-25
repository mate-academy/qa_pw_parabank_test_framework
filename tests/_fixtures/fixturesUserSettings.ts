import { test as base } from '@playwright/test';

import { createContactData } from '../../src/common/testData/contactData';
import { UpdateContactInfoPage } from '../../src/ui/pages/profile/UpdateContactInfoPage';

export const test = base.extend<{
  updateContactInfoPage: UpdateContactInfoPage;
  updatedContactData;
}>({
  updateContactInfoPage: async ({ page }, use) => {
    const updateContactInfoPage = new UpdateContactInfoPage(page);

    await use(updateContactInfoPage);
  },

  updatedContactData: async ({}, use) => {
    await use(createContactData());
  },
});
