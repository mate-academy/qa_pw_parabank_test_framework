import { test as base } from '@playwright/test';

import { ForgotLoginPage } from '../../src/ui/pages/auth/ForgotLoginPage';

export const test = base.extend<{
  forgotLoginPage: ForgotLoginPage;
}>({
  forgotLoginPage: async ({ page }, use) => {
    const forgotLoginPage = new ForgotLoginPage(page);

    await use(forgotLoginPage);
  },
});
