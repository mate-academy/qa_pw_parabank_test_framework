import { OpenNewAccountPage } from '../../pages/loggedInUser/OpenNewAccount';
import { AccountOverviewPage } from '../../pages/loggedInUser/AccountOverviewPage';

import { testStep } from '../../../common/helpers/pwHelpers';

export async function openNewCheckingAccount(page, userId = 0) {
  await testStep(
    `Open New Account`,
    async () => {
      const openNewAccountPage = new OpenNewAccountPage(page, userId);
      const accountOverviewPage = new AccountOverviewPage(page, userId);



      
      await accountOverviewPage.clickAccountsOverviewLink();
      const accountMainData = await accountOverviewPage.getMainAccountData();
      await accountOverviewPage.clickOpenNewAccountLink();

      
      
      await openNewAccountPage.selectCheckingTypeOfAccount();
      await openNewAccountPage.selectFromAccountIdOption(accountMainData.accountNumber);
      await openNewAccountPage.clickOpenNewAccountButton();
      await openNewAccountPage.assertAccountOpenedMessage();
    },
    userId,
  );
}
