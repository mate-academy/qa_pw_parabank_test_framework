import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as testPages } from './fixturesPages';
import { test as testForms } from './fixturesForms';
import { test as testPanels } from './fixturesPanels';

export const test = mergeTests(genericTest, testPages, testForms, testPanels);
