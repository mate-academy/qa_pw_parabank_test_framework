import { generateUserData } from '../../../src/common/testData/generateUserInfo';
import { test } from '../../_fixtures/fixtures';
import { severity, Severity } from 'allure-js-commons';


test('Bill Payment is successful', async ({ existingUser, billPayPage }) => {
  await severity(Severity.CRITICAL);
  const payeeData = generateUserData();
  await billPayPage.open();
  await billPayPage.fillForm(payeeData);
  await billPayPage.clickSendPaymentButton();
  await billPayPage.assertPaymentComplete();
}); 