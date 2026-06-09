import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as authTest } from './fixtureAuth';
import { test as servicesTest } from './fixtureServices';

export const test = mergeTests(genericTest, authTest, servicesTest);
