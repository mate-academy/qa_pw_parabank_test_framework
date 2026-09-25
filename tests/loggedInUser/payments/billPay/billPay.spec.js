import * as allure from 'allure-js-commons';

import { test } from '../../../_fixtures/fixtures';

test('User can make a bill payment', async ({
  billPayPage,
  billPaymentData,
  loggedInUser,
}) => {
  await allure.severity('critical');

  await billPayPage.open();

  const fromAccountId = await billPayPage.fillPaymentForm(billPaymentData);

  await billPayPage.submitPayment();
  await billPayPage.assertPaymentIsSuccessful(billPaymentData, fromAccountId);
});
