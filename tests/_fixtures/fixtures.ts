import { mergeTests } from '@playwright/test';

import { test as accountsTest } from './fixturesAccounts';
import { test as authTest } from './fixturesAuth';
import { test as billPayTest } from './fixturesBillPay';
import { test as findTransactionsTest } from './fixturesFindTransactions';
import { test as forgotLoginTest } from './fixturesForgotLogin';
import { test as genericTest } from './fixturesGeneric';
import { test as transferFundsTest } from './fixturesTransferFunds';
import { test as userSettingsTest } from './fixturesUserSettings';
import { test as loansTest } from './fixturesLoans';

export const test = mergeTests(
  genericTest,
  authTest,
  forgotLoginTest,
  accountsTest,
  transferFundsTest,
  billPayTest,
  findTransactionsTest,
  userSettingsTest,
  loansTest,
);
