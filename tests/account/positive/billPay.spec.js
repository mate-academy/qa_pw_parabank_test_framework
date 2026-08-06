import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';
import { fillBillPayForm } from '../../../src/ui/actions/account/billPay';
import { getDefaultAccountNumber } from '../../../src/ui/interfaces/account';
import { generateBillPayData } from '../../../src/common/testData/account/billPayData';

test('should send a bill payment with valid payee data', async ({
  page,
  user,
  accountsOverviewPage,
  billPayPage,
}) => {
  await allure.severity('critical');

  await registerNewUser(page, user);

  const defaultAccountNumber = await getDefaultAccountNumber(accountsOverviewPage);

  const billPayData = generateBillPayData();

  await billPayPage.open();

  await billPayPage.assertOpened();

  await fillBillPayForm(billPayPage, billPayData);
  await billPayPage.selectFromAccount(defaultAccountNumber);
  await billPayPage.clickSendPaymentButton();

  await billPayPage.assertPaymentComplete(
    billPayData.name,
    billPayData.amount,
    defaultAccountNumber,
  );
});
