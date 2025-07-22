import { test } from "../../_fixtures/fixtures";
import { twoAccountsCreation } from "../../../src/common/helpers/twoAccountsCreation";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ page, user }) => {
  await twoAccountsCreation(page, user);
});

test('user can perform account activity filtering', async ({
  openNewAccountPage,
  accountOverviewPage
}) => {
  await allure.severity(`normal`);

  await openNewAccountPage.clickNewAccountNumberLink();
  await accountOverviewPage.assertTransactionTextOnAccountActivity();
  await accountOverviewPage.assertCreditAmountOnAccountActivity();
});
