import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { LEFT_PANEL_BUTTONS } from '../../../src/ui/constants/leftPanelButtons';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test(`Successful 'LogOut' flow test`, async ({
  homePage,
  signInPage,
  page,
}) => {
  await homePage.open();
  await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.LOG_OUT);
  await signInPage.assertSignInHeadingIsDisplayed();
});
