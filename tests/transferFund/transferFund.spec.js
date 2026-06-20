import { test } from '../_fixtures/fixtures';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { openNewAccount } from '../../src/ui/actions/auth/openNewAccount';

const AVALIBLE_AMOUNT = '100';
let newAccountId;

test.beforeEach(async({page, user}) => {
await signUpUser(page, user);
newAccountId = await openNewAccount(page, user);
});


test('Transfer Fuund Succsessful flow', async ({
  user,
  page,
  transferFundsPage,
  homePage,
}) => {

await homePage.clickTransferFundButton();
await transferFundsPage.inputAmountField(AVALIBLE_AMOUNT);
await transferFundsPage.selectToAccountDropdown(newAccountId);
  const fromAccountId = await transferFundsPage.getAccountId();

await transferFundsPage.clickTransferButton();
await transferFundsPage.assertSuccsessTransferTextVisible(
    fromAccountId,
    newAccountId,
    AVALIBLE_AMOUNT,
  );
});