import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as fixturesAuth } from './fixturesAuth';

export const test = mergeTests(genericTest, fixturesAuth);
