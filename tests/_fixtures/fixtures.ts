import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as fixturesAuth } from './fixturesAuth';
import { test as fixturesPages } from './fixturesPages';

export const test = mergeTests(genericTest, fixturesAuth, fixturesPages);
