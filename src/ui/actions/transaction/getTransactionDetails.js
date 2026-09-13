import { AccountOverviewPage } from '../../pages/account/AccountOverviewPage';
import { AccountDetailsPage } from '../../pages/account/AccountDetailsPage';
import { TransactionDetailsPage } from '../../pages/account/TransactionDetailsPage';
import { LEFT_PANEL_BUTTONS } from '../../constants/leftPanelButtons';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function getTransactionDetails(homePage, page) {
  return await testStep(`Get Transaction Details`, async () => {
    const accountOverviewPage = new AccountOverviewPage(page);
    const accountDetailsPage = new AccountDetailsPage(page);
    const transactionDetailsPage = new TransactionDetailsPage(page);

    await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.OVERVIEW);
    await accountOverviewPage.clickAccountNumber();
    await accountDetailsPage.clickLastTransaction();
    const transactionDetails =
      await transactionDetailsPage.getTransactionDetails();

    return transactionDetails;
  });
}
