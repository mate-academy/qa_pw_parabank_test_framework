import { mergeTests } from '@playwright/test';

import { test as genericTest } from './fixturesGeneric';
import { test as accountTest } from './fixturesAccounts';
import { test as pageFixtures } from './fixturesPage';

export const test = mergeTests(genericTest, accountTest, pageFixtures);
