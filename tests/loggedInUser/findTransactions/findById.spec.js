import { test } from '../../_fixtures/fixtures';
import { generateUserData } from '../../../src/common/testData/generateUserInfo';
import { severity, Severity } from 'allure-js-commons';


test('Find Transactions by ID', async ({ 
  existingUser, 
  transferFundsPage, 
  accountOverviewPage, 
  accountsDetailsPage, 
  findTransactionsPage, 
  transactionDetailsPage 
}) => {
  await severity(Severity.CRITICAL);
  await transferFundsPage.open();
  await transferFundsPage.fillAmount('500');
  await transferFundsPage.selectFromAccount({ index: 0 });
  await transferFundsPage.selectToAccount({ index: 0 });
  await transferFundsPage.clickTransferButton();
  await transferFundsPage.assertTransferSuccessMessageIsShown();
  await accountOverviewPage.open();
  const accountNumber = await accountOverviewPage.getAccountNumber();
  await accountOverviewPage.clickAccountNumber(accountNumber);
  await accountsDetailsPage.clickFirstTransaction();
  const transactionId = await transactionDetailsPage.getTransactionId();
  await findTransactionsPage.open();
  await findTransactionsPage.fillByTransactionIdField(transactionId);
  await findTransactionsPage.clickFindTransactionsByIdButton();
  await findTransactionsPage.assertTransactionResultsTableIsVisible();
  await findTransactionsPage.clickFirstTransaction();
  await transactionDetailsPage.assertTransactionIdIsShown(transactionId);

});