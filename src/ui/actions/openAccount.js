import { OpenAccountPage } from '../pages/accountServices/OpenAccountPage';
import { testStep } from '../../common/helpers/pwHelpers';

export async function openAccount(page, user, userId = 0) {
  return await testStep(
    `Open new account`,
    async () => {
      const openAccountPage = new OpenAccountPage(page, userId);

      await openAccountPage.open();
      await openAccountPage.waitForAccountOptions();
      await openAccountPage.clickOpenAccountButton();

      return await openAccountPage.getAccountNumber();
    },
    userId,
  );
}
