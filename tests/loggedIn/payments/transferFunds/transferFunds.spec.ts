import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { LEFT_PANEL_BUTTONS } from '../../../../src/ui/constants/leftPanelButtons';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test(`Successful 'Transfer Funds' flow test`, async ({
  homePage,
  transferFundsPage,
}) => {
  const AMOUNT = faker.number.int({ min: 2, max: 100 });

  await homePage.open();
  await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.TRANSFER);

  await transferFundsPage.assertTransferFundsPageIsVisible();

  await transferFundsPage.fillAmount(AMOUNT);

  await transferFundsPage.selectFirstFromAccount();

  await transferFundsPage.selectFirstToAccount();

  await transferFundsPage.clickTransfer();

  await transferFundsPage.assertTransferCompleteMessageIsVisible();
});
