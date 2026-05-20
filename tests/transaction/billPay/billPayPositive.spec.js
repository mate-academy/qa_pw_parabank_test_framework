import { test } from '../../_fixtures/fixtures';
import { BILL_PAY_SUCCESS_MESSAGE } from '../../../src/ui/constants/transactionMessages';
import { formatAmount } from '../../../src/common/helpers/currencyHelpers';
import * as allure from 'allure-js-commons';

test.describe(`Bill Payment positive tests`, () => {
  const toAccountId = 42000;
  const amount = 100;

  test(`Pay bill amount='${amount}' to account='${toAccountId}'`, async ({
    userData,
    billPayPage,
    signedUpUserWithOneAccount,
  }) => {
    await allure.severity('blocker');

    const { accountData } = signedUpUserWithOneAccount;
    const fromAccountId = accountData.accountId;
    const payeeName = `${userData.firstName} ${userData.lastName}`;

    await billPayPage.open();

    await billPayPage.fillFormInputs({
      payeeName,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipCode,
      phone: userData.phone,
      account: toAccountId,
      verifyAccount: toAccountId,
      amount,
    });

    await billPayPage.selectFromAccountId(fromAccountId);

    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertBillPaymentHeadingHasText(BILL_PAY_SUCCESS_MESSAGE);
    await billPayPage.assertPayeeNameResultHasText(payeeName);
    await billPayPage.assertAmountResultHasText(formatAmount(amount));
    await billPayPage.assertFromAccountIdResultHasText(fromAccountId);
  });
});
