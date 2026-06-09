import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/signUpUser';
import { label, severity } from 'allure-js-commons';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successful `Sign out` flow test', async ({
  homePage,
}) => {
  await label('parentSuite', 'Parabank');
  await label('suite', 'Auth');
  await label('subSuite', 'Sign Out');
  await severity('normal');

  await homePage.open();
  await homePage.clickLogoutLink();

  await homePage.assertLoginPanelVisible();
});
