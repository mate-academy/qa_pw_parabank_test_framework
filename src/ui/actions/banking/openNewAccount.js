import { OpenNewAccountPage } from '../../pages/OpenNewAccountPage';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function openNewAccount(page, accountType = '0', userId = 0) {
  return await testStep(
    `Open new account`,
    async () => {
      const openNewAccountPage = new OpenNewAccountPage(page, userId);

      await openNewAccountPage.open();
      await openNewAccountPage.selectAccountType(accountType);
      await openNewAccountPage.clickOpenNewAccountButton();
      await openNewAccountPage.assertAccountOpened();

      return await openNewAccountPage.getNewAccountId();
    },
    userId,
  );
}
