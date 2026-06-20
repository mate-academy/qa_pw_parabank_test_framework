import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { label, severity } from 'allure-js-commons';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Clicking account link navigates to `Accounts Overview` page', async ({
  homePage,
  overviewPage,
}) => {
  await label('parentSuite', 'Parabank');
  await label('suite', 'Account Overview');
  await label('subSuite', 'Account Overview');
  await severity('normal');

  await homePage.clickOverviewButton();

  await overviewPage.assertOverviewPageIsVisible();
});