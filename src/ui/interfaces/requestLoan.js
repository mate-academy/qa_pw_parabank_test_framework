import { registerNewUser } from '../actions/auth/register';
import { getDefaultAccountNumber } from './account';

export async function submitLoanRequest(
  page,
  user,
  accountsOverviewPage,
  requestLoanPage,
  { amount, downPayment },
) {
  await registerNewUser(page, user);

  const defaultAccountNumber = await getDefaultAccountNumber(accountsOverviewPage);

  await requestLoanPage.openAndAssert();

  await requestLoanPage.fillAmount(amount);
  await requestLoanPage.fillDownPayment(downPayment);
  await requestLoanPage.selectFromAccount(defaultAccountNumber);
  await requestLoanPage.clickApplyNowButton();
}
