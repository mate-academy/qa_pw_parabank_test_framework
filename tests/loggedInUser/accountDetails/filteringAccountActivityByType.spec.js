import { test } from '../../_fixtures/fixtures';
import { severity, Severity } from 'allure-js-commons';

test('Filtering activity by account type', async ({ 
  existingUser, 
  accountOverviewPage, 
  accountsDetailsPage, 
  transferFundsPage 
}) => {
  await severity(Severity.CRITICAL);
  await transferFundsPage.open();
  await transferFundsPage.fillAmount('1000');
  await transferFundsPage.selectFromAccount({ index: 0 });
  await transferFundsPage.selectToAccount({ index: 0 });
  await transferFundsPage.clickTransferButton();
  await transferFundsPage.assertTransferSuccessMessageIsShown();

  // eslint-disable-next-line max-len
  const accountNumber = await transferFundsPage.fromAccountDropdown.locator('option').nth(0).textContent();

  await accountOverviewPage.open();
  await accountOverviewPage.clickAccountNumber(accountNumber);
  await accountsDetailsPage.selectTransactionType('Debit');
  await accountsDetailsPage.clickGoButton();
  await accountsDetailsPage.assertOnlyDebitTransactionsShown();

  await accountsDetailsPage.selectTransactionType('Credit');
  await accountsDetailsPage.clickGoButton();
  await accountsDetailsPage.assertOnlyCreditTransactionsShown();
});