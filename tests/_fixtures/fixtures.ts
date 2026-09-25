import { mergeTests } from '@playwright/test';
import { test as allureTest } from './fixturesAllure';
import { test as genericTest } from './fixturesGeneric';
import { test as authTest } from './fixturesAuth';

export const test = mergeTests(genericTest, allureTest, authTest);
