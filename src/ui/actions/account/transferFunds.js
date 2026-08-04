export async function transferFunds(transferFundsPage, transfers) {
  for (const { amount, fromAccount, toAccount } of transfers) {
    await transferFundsPage.open();
    await transferFundsPage.fillAmount(amount);
    await transferFundsPage.selectFromAccount(fromAccount);
    await transferFundsPage.selectToAccount(toAccount);
    await transferFundsPage.clickTransferButton();
    await transferFundsPage.assertTransferComplete(amount, fromAccount, toAccount);
  }
}
