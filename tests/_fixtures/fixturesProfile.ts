import { test as base } from '@playwright/test';
import { UpdateContactInfoPage } from '../../src/ui/pages/profile/UpdateContactInfoPage';

export const test = base.extend<{
  updateContactInfoPage: UpdateContactInfoPage;
}>({
  updateContactInfoPage: async ({ page }, use) => {
    await use(new UpdateContactInfoPage(page));
  },
});
