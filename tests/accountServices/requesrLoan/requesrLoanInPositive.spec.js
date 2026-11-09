import { test } from '../../_fixtures/fixtures';
import { singUpUser } from '../../../src/ui/actions/auth/SignUpUser';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page, user }) => {
  await allure.parentSuite('Authentication');
  await allure.suite('Request Loanin');
  await allure.subSuite('Positive scenarios');
  await singUpUser(page, user);
});

test(`Request Loanin positive`, async ({ homePage, requestLoanPage }) => {
  await allure.severity(Severity.NORMAL);
  await homePage.clickRequestLoanButton();
  await requestLoanPage.fillLoanAmountField('100');
  await requestLoanPage.fillDownPaymentField();
  await requestLoanPage.selectFromAccount();
  await requestLoanPage.clickApplyNowButton();
  await requestLoanPage.assertMesseLoanApproved();
});
