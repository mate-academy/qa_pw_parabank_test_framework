import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { logInUser } from '../../../src/ui/actions/auth/logInUser';

test(`Sign up and Sign in just created user`, async ({
  page,
  user,
  accountServicesPanel,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'blocker' });

  await signUpUser(page, user);

  await accountServicesPanel.clickLogOutButton();

  await logInUser(page, user);
});
