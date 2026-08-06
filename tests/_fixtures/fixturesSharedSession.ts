import type { BrowserContext } from '@playwright/test';
import { test as base } from './fixtures';
import { registerNewUser } from '../../src/ui/actions/auth/register';
import { generateRegistrationData } from '../../src/common/testData/auth/registrationData';
import { BASE_URL } from '../../src/common/constants/baseUrl';

type WorkerStorageState = Awaited<ReturnType<BrowserContext['storageState']>>;

export const test = base.extend<
  {},
  { workerStorageState: WorkerStorageState }
>({
  workerStorageState: [
    async ({ browser }, use) => {
      const context = await browser.newContext({ baseURL: BASE_URL });
      const page = await context.newPage();

      const user = generateRegistrationData();

      await registerNewUser(page, user);

      const storageState = await context.storageState();
      await context.close();

      await use(storageState);
    },
    { scope: 'worker' },
  ],

  storageState: async ({ workerStorageState }, use) => {
    await use(workerStorageState);
  },
});
