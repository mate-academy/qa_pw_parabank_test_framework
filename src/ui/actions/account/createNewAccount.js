import { OpenAccountPage } from '../../pages/clientSide/OpenNewAccountPage';
import { AccountsOverviewPage } from '../../pages/clientSide/AccountOverviewPage';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function createNewAccount(page, accountType, userId = 0) {
  await testStep(
    `Create new account`,
    async () => {
      const openAccountPage = new OpenAccountPage(page, userId);
      const accountsOverviewPage = new AccountsOverviewPage(page, userId);
      await accountsOverviewPage.open();
      const firstAccountId = await accountsOverviewPage.getFirstAccountId();
      await openAccountPage.open();
      await openAccountPage.selectAccountType(accountType);
      await openAccountPage.selectExistingAccount(firstAccountId);
      await openAccountPage.clickOpenNewAccountButton();
    },
    userId,
  );
}
