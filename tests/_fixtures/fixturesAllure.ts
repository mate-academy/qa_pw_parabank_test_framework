import { test as base } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export const test = base.extend<{}, { clearAllureResults: void }>({
  clearAllureResults: [
    async ({}, use) => {
      const allurePath = path.join(process.cwd(), 'allure-results');

      if (fs.existsSync(allurePath)) {
        fs.rmSync(allurePath, { recursive: true, force: true });
      }

      await use();
    },
    { scope: 'worker', auto: true },
  ],
});
