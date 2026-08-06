import { test } from '../../_fixtures/fixturesSharedSession';
import * as allure from 'allure-js-commons';
import { fillBillPayForm } from '../../../src/ui/actions/account/billPay';
import { generateBillPayData } from '../../../src/common/testData/account/billPayData';
import {
  BILL_PAY_REQUIRED_FIELD_ERRORS,
  BILL_PAY_ACCOUNT_NUMBER_REQUIRED_ERROR,
  BILL_PAY_INVALID_NUMBER_ERROR,
  BILL_PAY_ACCOUNT_MISMATCH_ERROR,
  BILL_PAY_AMOUNT_REQUIRED_ERROR,
  BILL_PAY_AMOUNT_INVALID_ERROR,
} from '../../../src/common/constants/account/accountMessages';

const requiredFieldCases = [
  { dataField: 'name', errorKey: 'name' },
  { dataField: 'street', errorKey: 'address' },
  { dataField: 'city', errorKey: 'city' },
  { dataField: 'state', errorKey: 'state' },
  { dataField: 'zipCode', errorKey: 'zipCode' },
  { dataField: 'phoneNumber', errorKey: 'phoneNumber' },
];

const numberFieldCases = [
  {
    title: 'empty account number',
    override: () => ({ accountNumber: '' }),
    errorKey: 'account-empty',
    message: BILL_PAY_ACCOUNT_NUMBER_REQUIRED_ERROR,
  },
  {
    title: 'invalid account number',
    override: () => ({ accountNumber: 'abc' }),
    errorKey: 'account-invalid',
    message: BILL_PAY_INVALID_NUMBER_ERROR,
  },
  {
    title: 'empty verify account number',
    override: () => ({ verifyAccountNumber: '' }),
    errorKey: 'verifyAccount-empty',
    message: BILL_PAY_ACCOUNT_NUMBER_REQUIRED_ERROR,
  },
  {
    title: 'invalid verify account number',
    override: () => ({ verifyAccountNumber: 'abc' }),
    errorKey: 'verifyAccount-invalid',
    message: BILL_PAY_INVALID_NUMBER_ERROR,
  },
  {
    title: 'mismatched verify account number',
    override: (data) => ({
      verifyAccountNumber: String(Number(data.accountNumber) + 1),
    }),
    errorKey: 'verifyAccount-mismatch',
    message: BILL_PAY_ACCOUNT_MISMATCH_ERROR,
  },
  {
    title: 'empty amount',
    override: () => ({ amount: '' }),
    errorKey: 'amount-empty',
    message: BILL_PAY_AMOUNT_REQUIRED_ERROR,
  },
  {
    title: 'invalid amount',
    override: () => ({ amount: 'abc' }),
    errorKey: 'amount-invalid',
    message: BILL_PAY_AMOUNT_INVALID_ERROR,
  },
];

test.describe('Bill Pay - negative', () => {
  for (const { dataField, errorKey } of requiredFieldCases) {
    test(`should not send a bill payment with empty ${dataField}`, async ({
      billPayPage,
    }) => {
      await allure.severity('normal');

      await billPayPage.open();

      await billPayPage.assertOpened();

      await fillBillPayForm(billPayPage, {
        ...generateBillPayData(),
        [dataField]: '',
      });
      await billPayPage.clickSendPaymentButton();

      await billPayPage.assertFieldError(
        errorKey,
        BILL_PAY_REQUIRED_FIELD_ERRORS[dataField],
      );
    });
  }

  for (const { title, override, errorKey, message } of numberFieldCases) {
    test(`should not send a bill payment with ${title}`, async ({
      billPayPage,
    }) => {
      await allure.severity('normal');

      await billPayPage.open();

      await billPayPage.assertOpened();

      const billPayData = generateBillPayData();

      await fillBillPayForm(billPayPage, {
        ...billPayData,
        ...override(billPayData),
      });
      await billPayPage.clickSendPaymentButton();

      await billPayPage.assertFieldError(errorKey, message);
    });
  }
});
