import { test } from "../../_fixtures/fixtures";
import { twoAccountsCreation } from "../../../src/common/helpers/twoAccountsCreation";

test.beforeEach(async ({ page, user }) => {
  await twoAccountsCreation(page, user);
});

test('user can perform account activity filtering', async ({
  openNewAccountPage,
  accountOverviewPage
}) => {
  await openNewAccountPage.clickNewAccountNumberLink();
  await accountOverviewPage.assertTransactionTextOnAccountActivity();
  await accountOverviewPage.assertCreditAmountOnAccountActivity();
});
