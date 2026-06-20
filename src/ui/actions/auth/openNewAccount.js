import {testStep} from '../../../common/helpers/pwHelpers';
import { OpenNewAccountPage } from '../../pages/OpenNewAccountPage';


export async function openNewAccount (page, userId = 0){
  return await testStep (
    `Open new account`,
    async () => {
    const openNewAccountPage = new OpenNewAccountPage(page, userId);

    await openNewAccountPage.open();
    await openNewAccountPage.selectSavingAccountType();
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpened();
  
    return await openNewAccountPage.getAccountNumber();

    },
    userId,
  );
}