import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';
import { generateBillPayData } from '../../../src/common/testData/generateBillPayData';

test('Pay a bill from an account', async ({
  registeredCustomer,
  accountServicesNavPage,
  accountOverviewPage,
  billPayPage,
}) => {
  await allure.severity(Severity.CRITICAL);

  await accountServicesNavPage.clickAccountsOverview();
  const fromAccountId = await accountOverviewPage.getFirstAccountId();

  const payee = generateBillPayData();

  await accountServicesNavPage.clickBillPay();
  await billPayPage.submitBillPayForm(payee, fromAccountId);

  await billPayPage.assertPaymentSuccessful(
    payee.payeeName,
    payee.amount,
    fromAccountId,
  );
});
