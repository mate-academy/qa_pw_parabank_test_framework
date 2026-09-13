import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { LEFT_PANEL_BUTTONS } from '../../../../src/ui/constants/leftPanelButtons';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test(`Account 'Account Details' is displayed`, async ({
  homePage,
  accountOverviewPage,
  accountDetailsPage,
}) => {
  await homePage.open();
  await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.OVERVIEW);
  await accountOverviewPage.clickAccountNumber();
  await accountDetailsPage.assertAccountDetailsAreVisible();
});
