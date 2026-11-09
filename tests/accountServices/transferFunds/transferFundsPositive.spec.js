import { test } from '../../_fixtures/fixtures';
import { singUpUser } from '../../../src/ui/actions/auth/SignUpUser';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page, user, homePage, openNewAccuontPage }) => {
  await allure.parentSuite('Authentication');
  await allure.suite('Transfer Funds');
  await allure.subSuite('Positive scenarios');

  await singUpUser(page, user);
  await homePage.clickOpenNewAccountButton();
  await openNewAccuontPage.waitForURL();
  await openNewAccuontPage.clickSelectOptionIdAccount();
  await openNewAccuontPage.clickOpenNewAccountButton();
  await openNewAccuontPage.assertOpenNewAccountMessageText();
});

test(`Transfer funds positive`, async ({
  homePage,
  transferFundsPage,
  accountsOverviewPage,
}) => {
  await allure.severity(Severity.NORMAL);
  await homePage.clickTransferFundsButton();
  await transferFundsPage.fillAmountField('100');
  await transferFundsPage.clickSelectFromAccount();
  await transferFundsPage.clickSelectToAccount();
  await transferFundsPage.clickTransferButton();
  await transferFundsPage.assertMessageTransferComplete();
  await homePage.clickAccountsOverviewButton();
  await accountsOverviewPage.assertTransferFundsCorrect('200');
});
