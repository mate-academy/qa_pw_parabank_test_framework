import { signUpUser } from "./signUpUser";
import { OpenNewAccountPage } from "../../ui/pages/openNewAccountPage";
import { testStep } from "../helpers/pwHelpers";
import { AccountOverviewPage } from "../../ui/pages/accountOverviewPage";

export async function getTransactionId(page, user) {
  return await testStep(
    `get transaction id`,
    async () => {
      const openNewAccountPage = new OpenNewAccountPage(page);
      const accountOverviewPage = new AccountOverviewPage(page);
      const accountNumber = await signUpUser(page, user);

      await openNewAccountPage.clickOpenAccountLink();
      await openNewAccountPage.selectOptionFromAccountTypeDropdown('0');
      await openNewAccountPage.selectOptionFromExistingAccounts(accountNumber);
      await openNewAccountPage.clickOpenNewAccountButton();
      await accountOverviewPage.clickNewAccountNumber();
      await accountOverviewPage.clickTransactionDetailsLink();

      const transactionId = await accountOverviewPage.getTransactionId();

      return transactionId;
    },
  );
}


