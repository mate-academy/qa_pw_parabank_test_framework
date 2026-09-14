import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { LEFT_PANEL_BUTTONS } from '../../../../src/ui/constants/leftPanelButtons';

const testParameters = [
  {
    accountType: 'CHECKING',
  },

  {
    accountType: 'SAVINGS',
  },
];

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

testParameters.forEach(({ accountType }) => {
  test(`Open New Account - ${accountType}`, async ({
    homePage,
    openNewAccountPage,
  }) => {
    await homePage.open();
    await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.OPEN_ACCOUNT);
    await openNewAccountPage.selectAccountType(accountType);
    await openNewAccountPage.selectFirstAvailableAccount();
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertNewAccountsIsOpened();
  });
});
