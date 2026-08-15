export async function openNewAccounts(openNewAccountPage, accountsToOpen) {
  const newAccountNumbers = [];

  for (const { accountType, fromAccount } of accountsToOpen) {
    await openNewAccountPage.openAndAssert();
    await openNewAccountPage.selectAccountType(accountType);
    await openNewAccountPage.selectFromAccount(fromAccount);
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpened();

    const accountNumber = await openNewAccountPage.getNewAccountNumber();
    newAccountNumbers.push(accountNumber);
  }

  return newAccountNumbers;
}
