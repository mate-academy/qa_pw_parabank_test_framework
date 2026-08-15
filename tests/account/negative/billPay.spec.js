import { test } from '../../_fixtures/fixturesSharedSession';
import { test as freshSessionTest } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { fillBillPayForm } from '../../../src/ui/actions/account/billPay';
import {
  requiredFieldCases,
  numberFieldCases,
} from '../../../src/common/testData/account/billPayNegativeCases';

test.describe('Bill Pay - negative', () => {
  for (const { dataField, errorKey, message } of requiredFieldCases) {
    test(`should not send a bill payment with empty ${dataField}`, async ({
      billPayPage,
      billPayData,
    }) => {
      await allure.severity('normal');

      await billPayPage.openAndAssert();

      await fillBillPayForm(billPayPage, {
        ...billPayData,
        [dataField]: '',
      });
      await billPayPage.clickSendPaymentButton();

      await billPayPage.assertFieldError(errorKey, message);
    });
  }

  for (const { title, override, errorKey, message } of numberFieldCases) {
    test(`should not send a bill payment with ${title}`, async ({
      billPayPage,
      billPayData,
    }) => {
      await allure.severity('normal');

      await billPayPage.openAndAssert();

      await fillBillPayForm(billPayPage, {
        ...billPayData,
        ...override(billPayData),
      });
      await billPayPage.clickSendPaymentButton();

      await billPayPage.assertFieldError(errorKey, message);
    });
  }
});

// Deliberately outside the describe block above: that one runs on
// fixturesSharedSession, which logs a user in once per worker and reuses
// that session for every test — the opposite of what "not logged in" needs.
freshSessionTest(
  'should not show Bill Pay page without being logged in',
  async ({ billPayPage }) => {
    await allure.severity('normal');

    await billPayPage.open();

    await billPayPage.assertInternalError();
  },
);
