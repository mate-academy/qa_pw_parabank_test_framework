import { OpenNewAccountPage } from '../../pages/OpenNewAccountPage';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function openNewAccount(
  page,
  accountType = 'CHECKING',
  userId = 0,
) {
  return await testStep(
    `Open new ${accountType} account`,
    async () => {
      const openNewAccountPage = new OpenNewAccountPage(page, userId);

      await openNewAccountPage.clickOpenNewAccountLink();
      await openNewAccountPage.assertOpenNewAccountTitleIsVisible();
      await openNewAccountPage.assertSourceAccountIsAvailable();
      await openNewAccountPage.selectAccountType(accountType);
      await openNewAccountPage.clickOpenNewAccountButton();
      await openNewAccountPage.assertAccountOpenedSuccessfully();

      return await openNewAccountPage.getNewAccountId();
    },
    userId,
  );
}
