export async function searchByAmount(findTransactionsPage, accountNumber, amount) {
  await findTransactionsPage.openAndAssert();
  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillAmount(amount);
  await findTransactionsPage.clickFindByAmountButton();
}

export async function searchByDate(findTransactionsPage, accountNumber, date) {
  await findTransactionsPage.openAndAssert();
  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillTransactionDate(date);
  await findTransactionsPage.clickFindByDateButton();
}

export async function searchByDateRange(
  findTransactionsPage,
  accountNumber,
  fromDate,
  toDate,
) {
  await findTransactionsPage.openAndAssert();
  await findTransactionsPage.selectAccount(accountNumber);
  await findTransactionsPage.fillFromDate(fromDate);
  await findTransactionsPage.fillToDate(toDate);
  await findTransactionsPage.clickFindByDateRangeButton();
}

export async function searchByTransactionId(findTransactionsPage, transactionId) {
  await findTransactionsPage.openAndAssert();
  await findTransactionsPage.fillTransactionId(transactionId);
  await findTransactionsPage.clickFindByIdButton();
}

export async function assertTransactionsFound(findTransactionsPage, count) {
  await findTransactionsPage.assertResultsShown();
  await findTransactionsPage.assertTransactionCount(count);
}

export async function assertSingleTransactionFound(
  findTransactionsPage,
  expected,
  excluded = [],
) {
  await assertTransactionsFound(findTransactionsPage, 1);
  await findTransactionsPage.assertTransactionVisible(
    expected.description,
    expected.amount,
    expected.type,
    expected.date,
  );

  for (const item of excluded) {
    await findTransactionsPage.assertTransactionNotVisible(
      item.description,
      item.amount,
    );
  }
}
