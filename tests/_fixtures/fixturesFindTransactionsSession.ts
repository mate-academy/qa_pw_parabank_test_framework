import type { BrowserContext } from '@playwright/test';
import { test as base } from './fixtures';
import { registerNewUser } from '../../src/ui/actions/auth/register';
import { generateRegistrationData } from '../../src/common/testData/auth/registrationData';
import { BASE_URL } from '../../src/common/constants/baseUrl';
import { AccountsOverviewPage } from '../../src/ui/pages/account/AccountsOverviewPage';
import { OpenNewAccountPage } from '../../src/ui/pages/account/OpenNewAccountPage';
import { TransferFundsPage } from '../../src/ui/pages/account/TransferFundsPage';
import {
  getDefaultAccountNumber,
  openTrackedAccounts,
} from '../../src/ui/interfaces/account';
import { transferFunds } from '../../src/ui/actions/account/transferFunds';
import {
  SENT_TRANSACTION,
  RECEIVED_TRANSACTION,
} from '../../src/common/testData/account/findTransactionsCases';

type WorkerSession = {
  storageState: Awaited<ReturnType<BrowserContext['storageState']>>;
  accountNumber: string;
};

export const test = base.extend<
  { accountNumber: string },
  { workerSession: WorkerSession }
>({
  workerSession: [
    async ({ browser, logger }, use) => {
      const context = await browser.newContext({ baseURL: BASE_URL });
      const page = await context.newPage();

      const user = generateRegistrationData(logger);
      await registerNewUser(page, user);

      const accountsOverviewPage = new AccountsOverviewPage(page);
      const openNewAccountPage = new OpenNewAccountPage(page);
      const transferFundsPage = new TransferFundsPage(page);

      const defaultAccountNumber = await getDefaultAccountNumber(
        accountsOverviewPage,
      );

      const [{ accountNumber }] = await openTrackedAccounts(
        openNewAccountPage,
        { count: 1, fromAccount: defaultAccountNumber },
      );

      await transferFunds(transferFundsPage, [
        {
          amount: SENT_TRANSACTION.amount,
          fromAccount: accountNumber,
          toAccount: defaultAccountNumber,
        },
        {
          amount: RECEIVED_TRANSACTION.amount,
          fromAccount: defaultAccountNumber,
          toAccount: accountNumber,
        },
      ]);

      const storageState = await context.storageState();
      await context.close();

      await use({ storageState, accountNumber });
    },
    { scope: 'worker' },
  ],

  storageState: async ({ workerSession }, use) => {
    await use(workerSession.storageState);
  },

  accountNumber: async ({ workerSession }, use) => {
    await use(workerSession.accountNumber);
  },
});
