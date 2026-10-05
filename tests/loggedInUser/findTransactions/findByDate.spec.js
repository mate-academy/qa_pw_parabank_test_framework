import { test } from '../../_fixtures/fixtures';
import { generateUserData } from '../../../src/common/testData/generateUserInfo';
import { severity, Severity } from 'allure-js-commons';


test('Find Transactions by Date', async ({ 
  existingUser, 
  transferFundsPage, 
  accountOverviewPage, 
  accountsDetailsPage, 
  findTransactionsPage 
}) => {
  await severity(Severity.CRITICAL);
  await transferFundsPage.open();
  await transferFundsPage.fillAmount('700');
  await transferFundsPage.selectFromAccount({ index: 0 });
  await transferFundsPage.selectToAccount({ index: 0 });
  await transferFundsPage.clickTransferButton();
  await transferFundsPage.assertTransferSuccessMessageIsShown();
  await accountOverviewPage.open();
  const accountNumber = await accountOverviewPage.getAccountNumber();
  await accountOverviewPage.clickAccountNumber(accountNumber);
  const transactionDate = await accountsDetailsPage.getTransactionDate();
  await findTransactionsPage.open();
  await findTransactionsPage.fillByDateField(transactionDate);
  await findTransactionsPage.clickFindTransactionsByDateButton();
  await findTransactionsPage.assertTransactionResultsTableIsVisible();
  await findTransactionsPage.assertResultsShowDate(transactionDate);

});