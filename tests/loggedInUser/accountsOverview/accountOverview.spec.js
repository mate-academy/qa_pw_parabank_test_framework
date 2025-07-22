import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/common/helpers/signUpUser";
import * as allure from "allure-js-commons";

test('user can overview account datails of created account', async ({
  page,
  user,
  accountOverviewPage
}) => {
  const accountNumber = await signUpUser(page, user);

  await allure.severity(`normal`);

  await accountOverviewPage.clickAccountNumber(accountNumber);
  await accountOverviewPage.assertAccountNumberOnAccountDetails(accountNumber);
});
