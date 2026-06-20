import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as authTest } from './fixtureAuth';
import {test as pageTest} from './fixturePages';


export const test = mergeTests(genericTest, authTest, pageTest);
