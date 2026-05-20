import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as authTest } from './fixturesAuth';
import { test as accountTest } from './fixtureAccount';
import { test as transactionTest } from './fixtureTransaction';

export const test = mergeTests(
  genericTest,
  authTest,
  accountTest,
  transactionTest,
);
