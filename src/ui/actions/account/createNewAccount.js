import { testStep } from '../../../common/helpers/pwHelpers';
import { AccountServicesPanel } from '../../pages/AccountServicesPanel';
import { OpenNewAccountPage } from '../../pages/account/OpenNewAccountPage';
import { OverviewPage } from '../../pages/account/OverviewPage';

export async function createNewAccount(page, userId = 0) {
  return await testStep(
    `Create a new account`,
    async () => {
      const accountServicesPanel = new AccountServicesPanel(page, userId);
      const openNewAccountPage = new OpenNewAccountPage(page, userId);
      const overviewPage = new OverviewPage(page, userId);

      await accountServicesPanel.clickOpenNewAccountLink();
      await openNewAccountPage.submitNewAccountForm();
      const newAccountNumber = await openNewAccountPage.getNewAccountNumber();

      await accountServicesPanel.clickAccountsOverviewLink();

      const accountRows = await overviewPage.getAllRowsData();
      const totalBalance = await overviewPage.getTotalBalanceText();

      return { newAccountNumber, accountRows, totalBalance };
    },
    userId,
  );
}
