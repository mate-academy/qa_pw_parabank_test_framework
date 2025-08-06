import { test } from '../../_fixtures/fixtures';
import { logInUser } from '../../../src/ui/actions/auth/logInUser';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 2, usersNumber: 2 });

test(`Sign up and Sign in`, async ({ pages, user }, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'blocker' });

  // Sign up in the first context
  await signUpUser(pages[0], user, 1);
  // Sign in in another context
  await logInUser(pages[1], user, 2);
});
