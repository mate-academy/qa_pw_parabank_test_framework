import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/common/helpers/signUpUser";
import { OPENED_ACCOUNT_MESSAGE } from "../../../src/common/test data/constants";

const accountTypes = [
  { name: 'Checking', value: '0' },
  { name: 'Savings', value: '1' }
];

test('user can open new checking and savings account types', async ({
  page,
  openNewAccountPage,
  user
}) => {
  const accountNumber = await signUpUser(page, user);

  for (const { name, value } of accountTypes) {
    await test.step(`Open a ${name} account`, async () => {
      await openNewAccountPage.clickOpenAccountLink();
      await openNewAccountPage.selectOptionFromAccountTypeDropdown(value);
      await openNewAccountPage.selectOptionFromExistingAccounts(accountNumber);
      await openNewAccountPage.clickOpenNewAccountButton();
      await openNewAccountPage.assertWelcomeText(OPENED_ACCOUNT_MESSAGE);
    });
  }
});
