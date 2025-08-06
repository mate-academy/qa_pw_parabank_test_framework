import { test } from '../../_fixtures/fixtures';
import { lookupUser } from '../../../src/ui/actions/auth/lookupUser';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test(`Look up user and Sign in`, async ({
  page,
  user,
  accountServicesPanel,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'blocker' });

  await test.step('Create a new user', async () => {
    await signUpUser(page, user);
    await accountServicesPanel.clickLogOutButton();
  });
  await test.step('Lookup just created user', async () => {
    await lookupUser(page, user);
    await accountServicesPanel.assertWelcomeMessageIncludesUser(user);
  });
});
