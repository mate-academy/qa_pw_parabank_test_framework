import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class FindTransactionPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountIdDropdown = page.locator('#accountId');

    this.findByTransactionIdField = page.locator('#transactionId');
    this.findByTransactionIdButton = page.locator('#findById');
    this.findByTransactionIdErrorMessage = page.locator('#transactionIdError');

    this.findByDateField = page.locator('#transactionDate');
    this.findByDateButton = page.locator('#findByDate');
    this.findByDateErrorMessage = page.locator('#transactionDateError');

    this.findByFromDateField = page.locator('#fromDate');
    this.findByToDateField = page.locator('#toDate');
    this.findByDateRangeButton = page.locator('#findByDateRange');
    this.findByDateRangeErrorMessage = page.locator('#dateRangeError');

    this.findByAmountField = page.locator('#amount');
    this.findByAmountButton = page.locator('#findByAmount');
    this.findByAmountErrorMessage = page.locator('#amountError');

    this.transactionsTableBody = page.locator('#transactionBody');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Navigate to 'Find Transaction' page`, async () => {
      await this.page.goto(`findtrans.htm`);
    });
  }

  async selectAccountId(accountId) {
    await this.step(`Select Account ID='${accountId}'`, async () => {
      await this.accountIdDropdown.selectOption(accountId);
    });
  }

  async fillFindByTransactionIdField(transactionId) {
    await this.step(
      `Fill 'Find By Transaction ID' field with '${transactionId}'`,
      async () => {
        await this.findByTransactionIdField.fill(`${transactionId}`);
      },
    );
  }

  async fillFindByDateField(date) {
    await this.step(`Fill 'Find By Date' field with '${date}'`, async () => {
      await this.findByDateField.fill(`${date}`);
    });
  }

  async fillFindByDateRangeInputs(fromDate, toDate) {
    await this.step(
      `Fill 'Find By Date Range' field with from='${fromDate}', to='${toDate}'`,
      async () => {
        await this.findByFromDateField.fill(`${fromDate}`);
        await this.findByToDateField.fill(`${toDate}`);
      },
    );
  }

  async fillFindByAmountField(amount) {
    await this.step(
      `Fill 'Find By Amount' field with '${amount}'`,
      async () => {
        await this.findByAmountField.fill(`${amount}`);
      },
    );
  }

  async clickFindByTransactionIdButton() {
    await this.step(`Click 'Find By Transaction ID' button`, async () => {
      await this.findByTransactionIdButton.click();
    });
  }

  async clickFindByDateButton() {
    await this.step(`Click 'Find By Date' button`, async () => {
      await this.findByDateButton.click();
    });
  }

  async clickFindByDateRangeButton() {
    await this.step(`Click 'Find By Date Range' button`, async () => {
      await this.findByDateRangeButton.click();
    });
  }

  async clickFindByAmountButton() {
    await this.step(`Click 'Find By Amount' button`, async () => {
      await this.findByAmountButton.click();
    });
  }

  async assertTransactionIsVisible({
    transactionId,
    date = '',
    debit = '',
    credit = '',
  }) {
    await this.step(
      `Assert Transaction (transactionId=${transactionId}, date=${date}, debit=${debit}, credit=${credit}) is visible`,
      async () => {
        const transaction = this.transactionsTableBody.locator('tr').filter({
          has: this.page.locator(
            `td:nth-child(2) a[href*="id=${transactionId}"]`,
          ),
        });

        if (date) {
          await expect(transaction.locator('td:nth-child(1)')).toHaveText(date);
        }
        if (debit) {
          await expect(transaction.locator('td:nth-child(3)')).toHaveText(
            debit,
          );
        }
        if (credit) {
          await expect(transaction.locator('td:nth-child(4)')).toHaveText(
            credit,
          );
        }
      },
    );
  }

  async assertFindByTransactionIdErrorMessageHasText(messageText) {
    await this.step(
      `Assert 'Find By Transaction ID' error message shows '${messageText}'`,
      async () => {
        await expect(this.findByTransactionIdErrorMessage).toHaveText(
          messageText,
        );
      },
    );
  }

  async assertFindByDateErrorMessageHasText(messageText) {
    await this.step(
      `Assert 'Find By Date' error message shows '${messageText}'`,
      async () => {
        await expect(this.findByDateErrorMessage).toHaveText(messageText);
      },
    );
  }

  async assertFindByDateRangeErrorMessageHasText(messageText) {
    await this.step(
      `Assert 'Date Range' error message shows '${messageText}'`,
      async () => {
        await expect(this.findByDateRangeErrorMessage).toHaveText(messageText);
      },
    );
  }

  async assertFindByAmountErrorMessageHasText(messageText) {
    await this.step(
      `Assert 'Find By Amount' error message shows '${messageText}'`,
      async () => {
        await expect(this.findByAmountErrorMessage).toHaveText(messageText);
      },
    );
  }
}
