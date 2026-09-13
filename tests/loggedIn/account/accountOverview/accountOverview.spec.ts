import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { LEFT_PANEL_BUTTONS } from '../../../../src/ui/constants/leftPanelButtons';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test(`Successful 'Account Overview' flow test`, async ({
  homePage,
  accountOverviewPage,
}) => {
  await homePage.open();
  await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.OVERVIEW);
  await accountOverviewPage.assertAccountOverviewPageIsDisplayed();
});
