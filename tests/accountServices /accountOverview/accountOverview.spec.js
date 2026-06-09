import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/signUpUser';
import { label, severity } from 'allure-js-commons';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Clicking account link navigates to `Accounts Overview` page', async ({
  homePage,
  accountOverviewPage,
}) => {
  await label('parentSuite', 'Parabank');
  await label('suite', 'Account Services');
  await label('subSuite', 'Account Overview');
  await severity('normal');

  await homePage.open();
  await homePage.clickAccountOverviewLink();

  await accountOverviewPage.assertAccountOverviewPanelVisible();
});
