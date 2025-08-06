import { testStep, expect } from '../../../common/helpers/pwHelpers';
import { FIND_TRANSACTIONS_INPUT_ERRORS } from '../../constants/accountActions';

export class FindTransactionsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    // Account select
    this.accountSelect = page.locator('#accountId');
    this.accountError = page.locator('#accountIdError');

    // Transaction ID
    this.transactionIdInput = page.locator('#transactionId');
    this.transactionIdError = page.locator('#transactionIdError');
    this.findByIdButton = page.locator('#findById');

    // Transaction Date
    this.transactionDateInput = page.locator('#transactionDate');
    this.transactionDateError = page.locator('#transactionDateError');
    this.findByDateButton = page.locator('#findByDate');

    // Date Range
    this.fromDateInput = page.locator('#fromDate');
    this.toDateInput = page.locator('#toDate');
    this.dateRangeError = page.locator('#dateRangeError');
    this.findByDateRangeButton = page.locator('#findByDateRange');

    // Amount
    this.amountInput = page.locator('#amount');
    this.amountError = page.locator('#amountError');
    this.findByAmountButton = page.locator('#findByAmount');

    this.bodyOfTransactionResults = page.locator('#transactionBody tr');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Transfer Funds' page`, async () => {
      await this.page.goto('parabank/findtrans.htm');
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select From Account - ${accountNumber}`, async () => {
      await this.accountSelect.selectOption(accountNumber.toString());
    });
  }

  async submitFindTransactionsFormById(transactionId = '') {
    await this.step(
      `Submit 'Find Transactions' form by Transaction ID: ${transactionId}`,
      async () => {
        await this.transactionIdInput.fill(transactionId.toString());
        await this.findByIdButton.click();
      },
    );
  }

  async submitFindTransactionsFormByDate(date = '') {
    await this.step(
      `Submit 'Find Transactions' form by Transaction Date: ${date}`,
      async () => {
        await this.transactionDateInput.fill(date.toString());
        await this.findByDateButton.click();
      },
    );
  }

  async submitFindTransactionsFormByDateRange(fromDate = '', toDate = '') {
    await this.step(
      `Submit 'Find Transactions' form by Transaction Date Range: ` +
        `${fromDate} - ${toDate}`,
      async () => {
        await this.fromDateInput.fill(fromDate.toString());
        await this.toDateInput.fill(toDate.toString());
        await this.findByDateRangeButton.click();
      },
    );
  }

  async submitFindTransactionsFormByAmount(amount = '') {
    await this.step(
      `Submit 'Find Transactions' form by Transaction Amount: ${amount}`,
      async () => {
        await this.amountInput.fill(amount.toString());
        await this.findByAmountButton.click();
      },
    );
  }

  // Asserts
  async assertTransactionIdErrorIsVisible() {
    await this.step(
      `Check validation error is shown for Transaction ID field`,
      async () => {
        await expect(this.transactionIdError).toHaveText(
          FIND_TRANSACTIONS_INPUT_ERRORS.id,
        );
      },
    );
  }

  async assertTransactionDateErrorIsVisible() {
    await this.step(
      `Check validation error is shown for Transaction Date field`,
      async () => {
        await expect(this.transactionDateError).toHaveText(
          FIND_TRANSACTIONS_INPUT_ERRORS.date,
        );
      },
    );
  }

  async assertTransactionDateRangeErrorIsVisible() {
    await this.step(
      `Check validation error is shown for Transaction Date Range field`,
      async () => {
        await expect(this.dateRangeError).toHaveText(
          FIND_TRANSACTIONS_INPUT_ERRORS.dateRange,
        );
      },
    );
  }

  async assertTransactionAmountErrorIsVisible() {
    await this.step(
      `Check validation error is shown for Transaction Amount field`,
      async () => {
        await expect(this.amountError).toHaveText(
          FIND_TRANSACTIONS_INPUT_ERRORS.amount,
        );
      },
    );
  }

  async assertNoTransactionInTable() {
    await this.step(`Assert 'No transactions' in table`, async () => {
      await expect(this.bodyOfTransactionResults).toHaveCount(0);
    });
  }
}
