import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { LEFT_PANEL_BUTTONS } from '../../../../src/ui/constants/leftPanelButtons';
import { transferFunds } from '../../../../src/ui/actions/transaction/transferFunds';
import { getTransactionDetails } from '../../../../src/ui/actions/transaction/getTransactionDetails';

let transactionDetails;

test.beforeEach(async ({ page, user, homePage }) => {
  await signUpUser(page, user);
  await transferFunds(homePage, page);
  transactionDetails = await getTransactionDetails(homePage, page);
});

test.describe(`Successful 'Transaction search' flow test`, () => {
  test(`Successful 'Find by Transaction ID' flow test`, async ({
    homePage,
    findTransactionPage,
    transactionDetailsPage,
  }) => {
    await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.FIND_TRANS);
    await findTransactionPage.enterTransactionId(
      transactionDetails.transactionId,
    );
    await findTransactionPage.clickFindTransactionsById();
    await findTransactionPage.clickLastTransaction();
    await transactionDetailsPage.assertTransactionDetailsPageIsVisible();
    await transactionDetailsPage.assertTransactionID(
      transactionDetails.transactionId,
    );
  });

  test(`Successful 'Find by Transaction Date' flow test`, async ({
    homePage,
    findTransactionPage,
    transactionDetailsPage,
  }) => {
    await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.FIND_TRANS);
    await findTransactionPage.enterTransactionDate(transactionDetails.date);
    await findTransactionPage.clickFindTransactionsByDate();
    await findTransactionPage.clickLastTransaction();
    await transactionDetailsPage.assertTransactionDetailsPageIsVisible();
    await transactionDetailsPage.assertTransactionDate(transactionDetails.date);
  });
  test(`Successful 'Find by Transaction Date Range' flow test`, async ({
    homePage,
    findTransactionPage,
    transactionDetailsPage,
  }) => {
    await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.FIND_TRANS);
    await findTransactionPage.enterTransactionDateRange(
      transactionDetails.date,
    );
    await findTransactionPage.clickFindTransactionsByDateRange();
    await findTransactionPage.clickLastTransaction();
    await transactionDetailsPage.assertTransactionDetailsPageIsVisible();
    await transactionDetailsPage.assertTransactionDate(transactionDetails.date);
  });

  test(`Successful 'Find by Transaction Amount' flow test`, async ({
    homePage,
    findTransactionPage,
    transactionDetailsPage,
  }) => {
    await homePage.clickLeftPanel(LEFT_PANEL_BUTTONS.FIND_TRANS);
    await findTransactionPage.enterTransactionAmount(transactionDetails.amount);
    await findTransactionPage.clickFindTransactionsByAmount();
    await findTransactionPage.clickLastTransaction();
    await transactionDetailsPage.assertTransactionDetailsPageIsVisible();
    await transactionDetailsPage.assertTransactionAmount(
      transactionDetails.amount.toFixed(2),
    );
  });
});
