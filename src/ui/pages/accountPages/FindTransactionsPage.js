import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class FindTransactionsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.byTransactionIdField = page.locator('#transactionId');
    this.byDateField = page.locator('#transactionDate');
    this.fromDateField = page.locator('#fromDate');
    this.toDateField = page.locator('#toDate');
    this.byAmountField = page.locator('#amount');
    this.findTransactionsByIdButton = page.locator('#findById');
    this.findTransactionsByDateButton = page.locator('#findByDate');
    this.findTransactionsByDateRangeButton = page.locator('#findByDateRange');
    this.findTransactionsByAmountButton = page.locator('#findByAmount');
    this.transactionResultsTable = page.locator('#transactionTable');
    this.invalidTransactionIdError = page.locator('#transactionIdError');
    this.invalidDateError = page.locator('#transactionDateError');
    this.invalidDateRangeError = page.locator('#dateRangeError');
    this.invalidAmountError = page.locator('#amountError');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open "Find Transactions" page`, async () => {
      await this.page.goto('parabank/findtrans.htm');
    });
  }

  async fillByTransactionIdField(transactionId) {
    await this.step(`Fill by transaction ID field`, async () => {
      await this.byTransactionIdField.fill(transactionId);
    });
  }

  async fillByDateField(date) {
    await this.step(`Fill by date field`, async () => {
      await this.byDateField.fill(date);
    });
  }

  async fillFromDateField(date) {
    await this.step(`Fill from date field`, async () => {
      await this.fromDateField.fill(date);
    });
  }

  async fillToDateField(date) {
    await this.step(`Fill to date field`, async () => {
      await this.toDateField.fill(date);
    });
  }

  async fillByAmountField(amount) {
    await this.step(`Fill by amount field`, async () => {
      await this.byAmountField.fill(amount);
    });
  }

  async clickFindTransactionsByIdButton() {
    await this.step(`Click "Find Transactions by ID" button`, async () => {
      await this.findTransactionsByIdButton.click();
    });
  }

  async clickFindTransactionsByDateButton() {
    await this.step(`Click "Find Transactions by Date" button`, async () => {
      await this.findTransactionsByDateButton.click();
    });
  } 

  async clickFindTransactionsByDateRangeButton() {
    await this.step(`Click "Find Transactions by Date Range" button`, async () => {
      await this.findTransactionsByDateRangeButton.click();
    });
  }
  
  async clickFindTransactionsByAmountButton() { 
    await this.step(`Click "Find Transactions by Amount" button`, async () => {
      await this.findTransactionsByAmountButton.click();
    });
  }
  
  async assertTransactionResultsTableIsVisible() { 
    await this.step(`Assert transaction results table is visible`, async () => {
      await expect(this.transactionResultsTable).toBeVisible();
    });
  }

  async assertTransactionIdIsShownInResults(transactionId) {  
    await this.step(`Assert transaction ID ${transactionId} is shown in results`, async () => {
      const transactionIdCell = this.transactionResultsTable.locator('tbody tr td').first();
      await expect(transactionIdCell).toHaveText(transactionId);
    });
  } 

  async clickFirstTransaction() {
  await this.step('Click first transaction', async () => {
    await this.transactionResultsTable.locator('a').first().click();;
  });
}

async assertResultsRowCount(expectedCount) {
  await this.step(`Assert results table has ${expectedCount} rows`, async () => {
    const rows = this.transactionResultsTable.locator('tbody tr');
    await expect(rows).toHaveCount(expectedCount);
  });
}

async assertResultsShowDate(expectedDate) {
  await this.step(`Assert results show date ${expectedDate}`, async () => {
    const dateCell = this.transactionResultsTable.locator('tbody tr').first().locator('td').first();
    await expect(dateCell).toHaveText(expectedDate);
  });
}

async assertTransactionIdErrorIsShown(expectedError) {
  await this.step(`Assert transaction ID error is shown: ${expectedError}`, async () => {
    await expect(this.invalidTransactionIdError).toHaveText(expectedError);
  }); 
}

async assertTransactionDateErrorIsShown(expectedError) {
  await this.step(`Assert transaction date error is shown: ${expectedError}`, async () => {
    await expect(this.invalidDateError).toHaveText(expectedError);
  }); 
}

async assertTransactionDateRangeErrorIsShown(expectedError) {
  await this.step(`Assert transaction date range error is shown: ${expectedError}`, async () => {
    await expect(this.invalidDateRangeError).toHaveText(expectedError);
  }); 
}

async assertTransactionAmountErrorIsShown(expectedError) {
  await this.step(`Assert transaction amount error is shown: ${expectedError}`, async () => {
    await expect(this.invalidAmountError).toHaveText(expectedError);
  }); 
}}