import { testStep } from '../../../common/helpers/pwHelpers';
import { OpenNewAccountPage } from '../../pages/accountServices/OpenNewAccountPage';

export async function createNewAccount(page, accountType = '0', userId = 0, logger = null) {
  return await testStep(
    `Create new ${accountType === '0' ? 'CHECKING' : 'SAVINGS'} account`,
    async () => {
      const openNewAccountPage = new OpenNewAccountPage(page, userId, logger);

      await openNewAccountPage.open();
      await openNewAccountPage.fillAccountTypeDropdown(accountType);
      await openNewAccountPage.clickOpenNewAccountButton();
      await openNewAccountPage.assertSuccessTitleContainsText();
      await openNewAccountPage.assertNewAccountIdLinkIsVisible();

      return await openNewAccountPage.getNewAccountId();
    },
    userId,
  );
}
