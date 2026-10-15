import { mergeTests } from '@playwright/test';

import { test as genericTest } from './fixturesGeneric';
import { test as authTest } from './fixturesAuth';
import { test as accountsTest } from './fixturesAccounts';
import { test as paymentsTest } from './fixturesPayments';
import { test as transactionsTest } from './fixturesTransactions';
import { test as profileTest } from './fixturesProfile';
import { test as loansTest } from './fixturesLoans';

export const test = mergeTests(
  genericTest,
  authTest,
  accountsTest,
  paymentsTest,
  transactionsTest,
  profileTest,
  loansTest,
);
