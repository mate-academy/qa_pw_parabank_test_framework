import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as authTest } from './fixturesAuth';
import { test as accountServicesTest } from './fixturesAccountServices';

export const test = mergeTests(genericTest, authTest, accountServicesTest);
export { expect } from '@playwright/test';
