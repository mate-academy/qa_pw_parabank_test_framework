import { test } from '../_fixtures/fixtures';
import { label, severity } from 'allure-js-commons';

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


test('Transfer Funds Successful flow', async ({
  user,
  page,
  transferFundsPage,
  homePage,
}) => {

    await label('parentSuite', 'Parabank');
    await label('suite', 'Transfer Funds');
    await label('subSuite', 'Transfer Funds Successful');
    await severity('critical');

await homePage.clickTransferFundButton();
await transferFundsPage.inputAmountField(AVALIBLE_AMOUNT);
await transferFundsPage.selectToAccountDropdown(newAccountId);
  const fromAccountId = await transferFundsPage.getAccountId();

await transferFundsPage.clickTransferButton();
await transferFundsPage.assertSuccessTransferTextVisible(
    fromAccountId,
    newAccountId,
    AVALIBLE_AMOUNT,
  );
});