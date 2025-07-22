import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/common/helpers/signUpUser";

test('user can overview account datails of created account', async ({
  page,
  user,
  accountOverviewPage
}) => {
  const accountNumber = await signUpUser(page, user);

  await accountOverviewPage.clickAccountNumber(accountNumber);
  await accountOverviewPage.assertAccountNumberOnAccountDetails(accountNumber);
});
