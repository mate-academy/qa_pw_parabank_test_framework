import { OpenNewAccountPage } from "../../ui/pages/openNewAccountPage";
import { OPENED_ACCOUNT_MESSAGE } from "../test data/constants";
import { signUpUser } from "./signUpUser";
import { testStep } from "../helpers/pwHelpers";

export async function twoAccountsCreation(page, user, userId = 0) {
  const accountNumber = await signUpUser(page, user);
  const openNewAccountPage = new OpenNewAccountPage(page);

  const accountTypes = ['0', '1'];

  const createdAccountNumbers = [];

  for (const value of accountTypes) {
    await testStep(`Open account with type ${value}`, async () => {
      await openNewAccountPage.clickOpenAccountLink();
      await openNewAccountPage.selectOptionFromAccountTypeDropdown(value);
      await openNewAccountPage.selectOptionFromExistingAccounts(accountNumber);
      await openNewAccountPage.clickOpenNewAccountButton();

      const newAccountNumber = await openNewAccountPage.getAccountNumber();
      createdAccountNumbers.push(newAccountNumber);

      await openNewAccountPage.assertWelcomeText(OPENED_ACCOUNT_MESSAGE);
    }, userId);
  }

  return createdAccountNumbers;
}

