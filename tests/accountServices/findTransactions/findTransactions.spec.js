import { test } from '../../_fixtures/fixtures';
import { singUpUser } from '../../../src/ui/actions/auth/SignUpUser';
import { expect } from 'allure-playwright';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(
  async ({ homePage, user, page, openNewAccuontPage, transferFundsPage }) => {
    await allure.parentSuite('Authentication');
    await allure.suite('Find Transaction');
    await allure.subSuite('Positive scenarios');

    await singUpUser(page, user);
    await homePage.clickOpenNewAccountButton();
    await openNewAccuontPage.waitForURL();
    await openNewAccuontPage.selectTypeChecking();
    await openNewAccuontPage.clickSelectOptionIdAccount();
    await openNewAccuontPage.clickOpenNewAccountButton();
    await openNewAccuontPage.assertOpenNewAccountMessageText();
    await homePage.clickTransferFundsButton();
    await transferFundsPage.fillAmountField('100');
    await transferFundsPage.clickSelectFromAccount();
    await transferFundsPage.clickSelectToAccount();
    await transferFundsPage.clickTransferButton();
    await transferFundsPage.assertMessageTransferComplete();
  },
);

test.describe('Find transaction', () => {
  test('by amount', async ({ homePage, findTransactionPage }) => {
    await allure.severity(Severity.CRITICAL);
    await homePage.clickFindTransactionButton();
    await findTransactionPage.fillFindByAmountField();
    await findTransactionPage.clickFindByAmountButton();
    await findTransactionPage.clickTransactionDetails();

    const transactionId = await findTransactionPage.getTransactionId();
    expect(transactionId).toBeTruthy();
  });

  test('by date range', async ({ homePage, findTransactionPage }) => {
    await allure.severity(Severity.NORMAL);
    await homePage.clickFindTransactionButton();
    await findTransactionPage.fillBetwenField();
    await findTransactionPage.fillFromDateField();
    await findTransactionPage.clickFindByDateButton();
  });

  test('by transaction date', async ({ homePage, findTransactionPage }) => {
    await allure.severity(Severity.NORMAL);
    await homePage.clickFindTransactionButton();
    await findTransactionPage.fillTransctionDateField();
    await findTransactionPage.clickFindDateButton();
  });

  test('by id', async ({ homePage, findTransactionPage }) => {
    await allure.severity(Severity.MINOR);
    await homePage.clickFindTransactionButton();
    await findTransactionPage.fillFindByAmountField();
    await findTransactionPage.clickFindByAmountButton();
    await findTransactionPage.clickTransactionDetails();
    const transactionId = await findTransactionPage.getTransactionId();

    await homePage.clickFindTransactionButton();
    await findTransactionPage.fillFindByIdField(transactionId);
    await findTransactionPage.clickFindByIdButton();
  });
});
