import { test } from '../../_fixtures/fixtures';
import { severity, Severity } from 'allure-js-commons';


test('Find Transactions by Amount', async ({ 
  existingUser, 
  transferFundsPage, 
  findTransactionsPage 
}) => {
  await severity(Severity.CRITICAL);
  await transferFundsPage.open();
  await transferFundsPage.fillAmount('500');
  await transferFundsPage.selectFromAccount({ index: 0 });
  await transferFundsPage.selectToAccount({ index: 0 });
  await transferFundsPage.clickTransferButton();
  await transferFundsPage.assertTransferSuccessMessageIsShown();

  await findTransactionsPage.open();
  await findTransactionsPage.fillByAmountField('500');
  await findTransactionsPage.clickFindTransactionsByAmountButton();
  await findTransactionsPage.assertTransactionResultsTableIsVisible();
  await findTransactionsPage.assertResultsRowCount(2);

});