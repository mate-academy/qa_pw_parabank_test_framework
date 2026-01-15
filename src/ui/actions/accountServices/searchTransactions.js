import * as allure from 'allure-js-commons';

export const TRANSACTION_SEARCH_TYPES = {
  BY_ID: 'id',
  BY_DATE: 'date',
  BY_DATE_RANGE: 'dateRange',
  BY_AMOUNT: 'amount',
};

export async function searchTransactionById(findTransactionsPage, transactionId) {
  return await allure.step(
    `Search transaction by ID: ${transactionId}`,
    async () => {
      await findTransactionsPage.fillFindTransactionIdInput(transactionId);
      await findTransactionsPage.clickFindByTransactionIdButton();
    },
  );
}

export async function searchTransactionByDate(findTransactionsPage, date) {
  return await allure.step(
    `Search transactions by date: ${date}`,
    async () => {
      await findTransactionsPage.fillFindByDateInput(date);
      await findTransactionsPage.clickFindByDateButton();
    },
  );
}

export async function searchTransactionByDateRange(findTransactionsPage, fromDate, toDate) {
  return await allure.step(
    `Search transactions by date range: ${fromDate} to ${toDate}`,
    async () => {
      await findTransactionsPage.fillFindByDateBetweenFromInput(fromDate);
      await findTransactionsPage.fillFindByDateBetweenToInput(toDate);
      await findTransactionsPage.clickFindByDateBetweenButton();
    },
  );
}

export async function searchTransactionByAmount(findTransactionsPage, amount) {
  return await allure.step(
    `Search transactions by amount: ${amount}`,
    async () => {
      await findTransactionsPage.fillFindAmountInput(amount);
      await findTransactionsPage.clickFindByAmountButton();
    },
  );
}
