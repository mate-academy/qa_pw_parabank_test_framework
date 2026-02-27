import { test as base } from '@playwright/test';
import fs from 'fs/promises';

export { expect } from '@playwright/test';

export const test = base.extend<{
  clearAllureResults: void,
}>({
  clearAllureResults: [
    async ({}, use) => {
      await fs.rm('allure-results', { recursive: true, force: true });
      await use();
    },
    { scope: 'worker', auto: true },
  ],
});