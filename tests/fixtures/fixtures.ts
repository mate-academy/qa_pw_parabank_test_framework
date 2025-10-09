import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';

export const test = mergeTests(genericTest);
