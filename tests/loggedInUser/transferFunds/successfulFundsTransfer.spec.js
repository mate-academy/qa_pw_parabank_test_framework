import { test } from '../../_fixtures/fixtures';
import { severity, Severity } from 'allure-js-commons';

test('Successful funds transfer', async ({ 
  existingUser, 
  newAccountPage, 
  transferFundsPage, 
  accountOverviewPage 
}) => {
  await severity(Severity.CRITICAL);
  await newAccountPage.open();
  await newAccountPage.selectAccountType('SAVINGS');
  await newAccountPage.selectAvailableAccount();
  await newAccountPage.clickOpenNewAccountButton();
  await newAccountPage.assertNewAccountIsCreated();
  const newAccountNumber = await newAccountPage.getNewAccountNumber();
  await accountOverviewPage.open();
  await accountOverviewPage.assertAccountBalance(newAccountNumber, '$100.00');
  await transferFundsPage.open();
  await transferFundsPage.fillAmount('50');
  await transferFundsPage.selectFromAccount({ index: 0 });
  await transferFundsPage.selectToAccount({ index: 1 });
  await transferFundsPage.clickTransferButton();
  await transferFundsPage.assertTransferSuccessMessageIsShown();
  const fromAccountNumber = await transferFundsPage.getFromAccountNumber();
  const toAccountNumber = await transferFundsPage.getToAccountNumber();
  await transferFundsPage.assertCorrectTransfer('$50.00', fromAccountNumber, toAccountNumber);
  
});