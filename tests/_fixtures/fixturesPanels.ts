import { test as base } from '@playwright/test';
import { AccountServicesPanel } from '../../src/ui/pages/AccountServicesPanel';

export const test = base.extend<{
  accountServicesPanel;
}>({
  accountServicesPanel: async ({ page }, use) => {
    const accountServicesPanel = new AccountServicesPanel(page);

    await use(accountServicesPanel);
  },
});
