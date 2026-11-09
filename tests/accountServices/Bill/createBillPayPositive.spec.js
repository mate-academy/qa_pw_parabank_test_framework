import { singUpUser } from '../../../src/ui/actions/auth/SignUpUser';
import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

let user1AccountId;

test.beforeEach(async ({ page1, user1, accountsOverviewPage, homePage }) => {
  await allure.parentSuite('Authentication');
  await allure.suite('Create Bill Pay');
  await allure.subSuite('Positive scenarios');

  await singUpUser(page1, user1);
  await homePage.clickAccountsOverviewButton(page1);
  user1AccountId = await accountsOverviewPage.getFirstAccountId(page1);
});

test('Create bill pay positive', async ({
  page2,
  user2,
  homePage,
  billPayPage,
  user1,
}) => {
  await allure.severity(Severity.CRITICAL);
  await singUpUser(page2, user2);
  await homePage.clickBillPayButton(page2);
  await billPayPage.fillPayeeName(user1, page2);
  await billPayPage.fillAddressField(user1, page2);
  await billPayPage.fillCityField(user1, page2);
  await billPayPage.fillStateField(user1, page2);
  await billPayPage.fillZipCodeField(user1, page2);
  await billPayPage.fillPhoneNumberField(user1, page2);
  await billPayPage.fillAccountNumberField(user1AccountId, page2);
  await billPayPage.fillVeryAccountNumberField(user1AccountId, page2);
  await billPayPage.fillAmountField('100', page2);
  await billPayPage.clickSendPaymentButton(page2);
  await billPayPage.assertBillPaymentCompleted(page2);
});
