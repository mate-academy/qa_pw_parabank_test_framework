import { test as base } from '@playwright/test';
import { CustomerInfoForm } from '../../src/ui/forms/CustomerInfoForm';

export const test = base.extend<{
  customerInfoForm;
}>({
  customerInfoForm: async ({ page }, use) => {
    const customerInfoForm = new CustomerInfoForm(page);

    await use(customerInfoForm);
  },
});
