import { test } from "../../_fixtures/fixtures";
import { getTransactionId } from "../../../src/common/helpers/getTransactionId";
import {
  getToday_MM_DD_YYYY,
  getYesterday_MM_DD_YYYY
} from "../../../src/common/helpers/formatDate";
import * as allure from "allure-js-commons";

test.describe('Find Transactions activities', () => {
  test('user is able to find transactions by id', async ({
    page,
    user,
    findTransactionsPage,
    accountOverviewPage,
  }) => {
    const transactionId = await getTransactionId(page, user);

    await allure.severity(`critical`);

    await findTransactionsPage.goToFindTransactionPage();
    await findTransactionsPage.findTransactionById(transactionId);
    await accountOverviewPage.clickTransactionDetailsLink();
    await accountOverviewPage.assertTransactionIdIsCorrect(transactionId);
  });

  test('user is able to find transaction by date', async ({
    page,
    user,
    findTransactionsPage,
    accountOverviewPage
  }) => {
    const today = getToday_MM_DD_YYYY();

    await allure.severity(`critical`);

    await getTransactionId(page, user);
    await findTransactionsPage.goToFindTransactionPage();
    await findTransactionsPage.findTransactionByDate(today);
    await accountOverviewPage.clickTransactionDetailsLink();
    await accountOverviewPage.assertDateIsCorrect(today);
  });

  test('user is able to find transaction by date range', async ({
    page,
    user,
    findTransactionsPage,
    accountOverviewPage
  }) => {
    const today = getToday_MM_DD_YYYY();
    const yesterday = getYesterday_MM_DD_YYYY();

    await allure.severity(`critical`);

    await getTransactionId(page, user);
    await findTransactionsPage.goToFindTransactionPage();
    await findTransactionsPage.findTransactionByDateRange(yesterday, today);
    await accountOverviewPage.clickTransactionDetailsLink();
    await accountOverviewPage.assertDateIsCorrect(today);
  });

  test('user is able to find transaction by amount', async ({
    page,
    user,
    findTransactionsPage,
    accountOverviewPage
  }) => {
    await allure.severity(`critical`);

    await getTransactionId(page, user);
    await findTransactionsPage.goToFindTransactionPage();
    await findTransactionsPage.findTransactionByAmount('100');
    await accountOverviewPage.clickTransactionDetailsLink();
    await accountOverviewPage.assertAmountIsCorrect('100');
  });
});
