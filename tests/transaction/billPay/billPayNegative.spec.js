import { test } from '../../_fixtures/fixtures';
import {
  BILL_PAY_PAYEE_NAME_REQUIRED_ERROR_MESSAGE,
  BILL_PAY_ADDRESS_REQUIRED_ERROR_MESSAGE,
  BILL_PAY_CITY_REQUIRED_ERROR_MESSAGE,
  BILL_PAY_STATE_REQUIRED_ERROR_MESSAGE,
  BILL_PAY_ZIP_CODE_REQUIRED_ERROR_MESSAGE,
  BILL_PAY_PHONE_REQUIRED_ERROR_MESSAGE,
  BILL_PAY_ACCOUNT_REQUIRED_ERROR_MESSAGE,
  BILL_PAY_ACCOUNT_INVALID_ERROR_MESSAGE,
  BILL_PAY_VERIFY_ACCOUNT_REQUIRED_ERROR_MESSAGE,
  BILL_PAY_VERIFY_ACCOUNT_INVALID_ERROR_MESSAGE,
  BILL_PAY_VERIFY_ACCOUNT_MISMATCH_ERROR_MESSAGE,
  BILL_PAY_AMOUNT_REQUIRED_ERROR_MESSAGE,
  BILL_PAY_AMOUNT_INVALID_ERROR_MESSAGE,
} from '../../../src/ui/constants/transactionMessages';
import * as allure from 'allure-js-commons';

test.describe(`Bill Payment negative tests`, () => {
  test(`Shows error when all fields are empty`, async ({
    signedUpUserWithOneAccount,
    billPayPage,
  }) => {
    await allure.severity('normal');

    await billPayPage.open();

    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertErrorMessageHasText(
      billPayPage.payeeNameErrorMessage,
      BILL_PAY_PAYEE_NAME_REQUIRED_ERROR_MESSAGE,
    );
    await billPayPage.assertErrorMessageHasText(
      billPayPage.addressErrorMessage,
      BILL_PAY_ADDRESS_REQUIRED_ERROR_MESSAGE,
    );
    await billPayPage.assertErrorMessageHasText(
      billPayPage.cityErrorMessage,
      BILL_PAY_CITY_REQUIRED_ERROR_MESSAGE,
    );
    await billPayPage.assertErrorMessageHasText(
      billPayPage.stateErrorMessage,
      BILL_PAY_STATE_REQUIRED_ERROR_MESSAGE,
    );
    await billPayPage.assertErrorMessageHasText(
      billPayPage.zipCodeErrorMessage,
      BILL_PAY_ZIP_CODE_REQUIRED_ERROR_MESSAGE,
    );
    await billPayPage.assertErrorMessageHasText(
      billPayPage.phoneErrorMessage,
      BILL_PAY_PHONE_REQUIRED_ERROR_MESSAGE,
    );
    await billPayPage.assertErrorMessageHasText(
      billPayPage.accountEmptyErrorMessage,
      BILL_PAY_ACCOUNT_REQUIRED_ERROR_MESSAGE,
    );
    await billPayPage.assertErrorMessageHasText(
      billPayPage.verifyAccountEmptyErrorMessage,
      BILL_PAY_VERIFY_ACCOUNT_REQUIRED_ERROR_MESSAGE,
    );
    await billPayPage.assertErrorMessageHasText(
      billPayPage.amountEmptyErrorMessage,
      BILL_PAY_AMOUNT_REQUIRED_ERROR_MESSAGE,
    );
  });

  test(`Shows error when 'Account' input field is invalid`, async ({
    signedUpUserWithOneAccount,
    billPayPage,
  }) => {
    await allure.severity('critical');

    const toAccountId = 'abc';

    await billPayPage.open();

    await billPayPage.fillFormInputs({ account: toAccountId });

    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertErrorMessageHasText(
      billPayPage.accountInvalidErrorMessage,
      BILL_PAY_ACCOUNT_INVALID_ERROR_MESSAGE,
    );
  });

  test(`Shows error when 'Verify Account' input field is invalid`, async ({
    signedUpUserWithOneAccount,
    billPayPage,
  }) => {
    await allure.severity('critical');

    const toAccountId = 'abc';

    await billPayPage.open();

    await billPayPage.fillFormInputs({ verifyAccount: toAccountId });

    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertErrorMessageHasText(
      billPayPage.verifyAccountInvalidErrorMessage,
      BILL_PAY_VERIFY_ACCOUNT_INVALID_ERROR_MESSAGE,
    );
  });

  test(`Shows error when 'Verify Account' input field is mismatched`, async ({
    signedUpUserWithOneAccount,
    billPayPage,
  }) => {
    await allure.severity('blocker');

    const toAccountId = 42000;
    const verifyToAccountId = 42001;
    await billPayPage.open();

    await billPayPage.fillFormInputs({ account: toAccountId });
    await billPayPage.fillFormInputs({ verifyAccount: verifyToAccountId });

    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertErrorMessageHasText(
      billPayPage.verifyAccountMismatchedErrorMessage,
      BILL_PAY_VERIFY_ACCOUNT_MISMATCH_ERROR_MESSAGE,
    );
  });

  test(`Shows error when 'Amount' input field is invalid`, async ({
    signedUpUserWithOneAccount,
    billPayPage,
  }) => {
    await allure.severity('critical');

    const amount = 'abc';

    await billPayPage.open();

    await billPayPage.fillFormInputs({ amount });

    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertErrorMessageHasText(
      billPayPage.amountInvalidErrorMessage,
      BILL_PAY_AMOUNT_INVALID_ERROR_MESSAGE,
    );
  });
});
