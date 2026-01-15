import { test, expect } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { faker } from '@faker-js/faker';
import { generatePayeeData } from '../../src/common/helpers/dataHelpers';
import { payBill } from '../../src/ui/actions/accountServices/payBill';
import { INVALID_NUMERIC_INPUTS } from '../../src/common/helpers/numberHelpers';
import { EPICS, FEATURES, SEVERITY } from '../../src/constants/index.js';

test.describe('Bill Pay Tests', () => {
  test('User can pay a bill with valid data', async ({
    page,
    loggedInUser,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.BILL_PAY);
    await allure.story('User is able to pay bills to payees');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('positive', 'bill', 'payment');

    const payeeData = generatePayeeData();
    const amount = faker.finance.amount({ min: 10, max: 500, dec: 2 });

    await payBill(page, payeeData, amount);
  });

  test.describe('Required Fields Validation', () => {
    const requiredFieldsTestCases = [
      { field: 'payeeName', description: 'payee name' },
      { field: 'address', description: 'address' },
      { field: 'amount', description: 'amount' },
    ];

    requiredFieldsTestCases.forEach(({ field, description }) => {
      test(`User cannot pay bill without ${description}`, async ({
        loggedInUser,
        billPayPage,
      }) => {
        await allure.epic(EPICS.ACCOUNT_SERVICES);
        await allure.feature(FEATURES.BILL_PAY);
        await allure.story('User cannot pay bill without required fields');
        await allure.severity(SEVERITY.NORMAL);
        await allure.tag('negative', 'bill', 'validation', 'parametrized');

        const payeeData = generatePayeeData();
        const amount = faker.finance.amount({ min: 10, max: 500, dec: 2 });

        await billPayPage.open();
        await billPayPage.fillBillPayForm(payeeData, amount, field);
        await billPayPage.clickSendPaymentButton();

        await billPayPage.assertErrorMessageContainsText(field);
      });
    });
  });

  test('User cannot pay bill with mismatched account numbers', async ({
    loggedInUser,
    billPayPage,
  }) => {
    await allure.epic(EPICS.ACCOUNT_SERVICES);
    await allure.feature(FEATURES.BILL_PAY);
    await allure.story('User cannot pay bill with mismatched account numbers');
    await allure.severity(SEVERITY.CRITICAL);
    await allure.tag('negative', 'bill', 'validation');

    const payeeData = generatePayeeData();
    const amount = faker.finance.amount({ min: 10, max: 500, dec: 2 });

    await billPayPage.open();
    await billPayPage.fillBillPayForm(payeeData, amount, 'accountNumber');
    await billPayPage.fillAccountNumberInput(payeeData.accountNumber);
    await billPayPage.fillVerifyAccountNumberInput(payeeData.accountNumber + '999');
    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertErrorMessageContainsText('mismatchAccountNumber');
  });

  test.describe('Amount Numeric Validation', () => {
    INVALID_NUMERIC_INPUTS.forEach(({ value, description }) => {
      test(`User cannot pay bill with ${description} amount`, async ({
        loggedInUser,
        billPayPage,
      }) => {
        await allure.epic(EPICS.ACCOUNT_SERVICES);
        await allure.feature(FEATURES.BILL_PAY);
        await allure.story('User cannot pay bill with invalid amount values');
        await allure.severity(SEVERITY.NORMAL);
        await allure.tag('negative', 'bill', 'validation', 'parametrized');

        const payeeData = generatePayeeData();

        await billPayPage.open();
        await billPayPage.fillBillPayForm(payeeData, value);
        await billPayPage.clickSendPaymentButton();

        await billPayPage.assertBillPaymentFailedWithInvalidAmount(value);
      });
    });
  });
});
