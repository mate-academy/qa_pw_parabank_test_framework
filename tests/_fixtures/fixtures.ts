import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as fixturesUser } from './fixturesUser';
import { test as fixturesPages } from './fixturesPages';
import { test as fixturesAccounts } from './fixturesAccounts';

export const test = mergeTests(genericTest, fixturesUser, fixturesPages, fixturesAccounts);
