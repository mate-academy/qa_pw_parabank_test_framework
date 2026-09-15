import { NewAccountPage } from '../../pages/NewAccountPage';
import { ACCOUNT_TYPES } from '../../constants/accountConstants';

export async function openNewAccount(
  page,
  accountType = ACCOUNT_TYPES.checking,
  userId = 0,
) {
  const newAccountPage = new NewAccountPage(page, userId);

  await newAccountPage.goToOpenNewAccount();
  await newAccountPage.selectAccountType(accountType);
  await newAccountPage.clickOpenNewAccount();

  return await newAccountPage.getNewAccountNumber();
}
