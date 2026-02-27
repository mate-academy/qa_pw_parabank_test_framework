import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as authTest } from './fixturesAuth';
import { test as loggedInUserTest} from './fixturesLoggedInUser'
import { test as clearAllureResults }  from './fixturesClearAllureResults';
export const test = mergeTests(genericTest, authTest, loggedInUserTest, clearAllureResults);
