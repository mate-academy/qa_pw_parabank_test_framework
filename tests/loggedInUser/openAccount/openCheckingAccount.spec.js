import { test } from '../../_fixtures/fixtures';
import { severity, Severity } from 'allure-js-commons';

test('Checking account is opened with $100 balance', async ({ 
  existingUser, 
  newAccountPage, 
  accountOverviewPage 
}) => {
  await severity(Severity.CRITICAL);
  await newAccountPage.open();
  await newAccountPage.selectAccountType('CHECKING');
  await newAccountPage.selectAvailableAccount();
  await newAccountPage.clickOpenNewAccountButton();
  await newAccountPage.assertNewAccountIsCreated();
  const newAccountNumber = await newAccountPage.getNewAccountNumber();
  await accountOverviewPage.open();
  await accountOverviewPage.assertAccountBalance(newAccountNumber, '$100.00');
});