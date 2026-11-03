import { testStep } from '../../../common/helpers/pwHelpers';
import { OpenAccountPage } from '../../pages/loggedIn/OpenAccountPage';

export async function openNewAccount(page, accountType, fromAccountId) {
  return await testStep(`Open new ${accountType.label} account`, async () => {
    const openAccountPage = page instanceof OpenAccountPage ? page : new OpenAccountPage(page);
    
    await openAccountPage.open();
    await openAccountPage.selectAccountType(accountType);
    if (fromAccountId) {
      await openAccountPage.selectFromAccount(fromAccountId);
    }
    await openAccountPage.submitAccountForm();
    await openAccountPage.assertAccountOpened();

    return await openAccountPage.getNewAccountId();
  });
}