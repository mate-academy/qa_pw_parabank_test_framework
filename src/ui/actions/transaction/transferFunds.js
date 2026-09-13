import { faker } from '@faker-js/faker';
import { TransferFundsPage } from '../../pages/account/TransferFundsPage';
import { LEFT_PANEL_BUTTONS } from '../../constants/leftPanelButtons';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function transferFunds(homePage, page) {
  await testStep(`Transfer funds`, async () => {
    const transferFundsPage = new TransferFundsPage(page);
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
}
