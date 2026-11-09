import { expect, testStep } from '../../common/helpers/pwHelpers';

export class FindTransactionPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.findByAmountField = page.locator('#amount');
    this.findByAmountButton = page.locator('#findByAmount');
    this.transactionDetails = page
      .getByRole('link', { name: 'Funds Transfer Sent' })
      .first();

    this.textTransactionsDetails = page.getByRole('heading', {
      name: 'Transaction Details',
    });
    this.fromDateField = page.locator('#fromDate');
    this.toDateField = page.locator('#toDate');
    this.findByDateButton = page.locator('#findByDateRange');
    this.transactionDateField = page.locator('#transactionDate');
    this.findbyDateTodayButton = page.locator('#findByDate');
    this.findByIdField = page.locator('#transactionId');
    this.findByIdButton = page
      .getByRole('button', { name: 'Find Transactions' })
      .first();
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillFindByAmountField() {
    await this.step(`Fill Find by amount field`, async () => {
      await this.findByAmountField.fill('100');
    });
  }
  async clickFindByAmountButton() {
    await this.step(`Click find by amount button`, async () => {
      await this.findByAmountButton.click();
    });
  }
  async clickTransactionDetails() {
    await this.step(`Click transaction details`, async () => {
      await this.transactionDetails.click();
      await expect(this.textTransactionsDetails).toBeVisible();
    });
  }
  async getTransactionId(page = this.page) {
    return await this.step('Get transaction id', async () => {
      const row = page.locator('#rightPanel tr', {
        hasText: 'Transaction ID:',
      });
      const idCell = row.locator('td').nth(1);
      await expect(idCell).toBeVisible();
      return (await idCell.innerText()).trim();
    });
  }
  async fillFromDateField() {
    await this.step(`Fill from date field`, async () => {
      await this.fromDateField.fill('10-08-2026');
    });
  }
  async fillToDateField() {
    await this.step(`Fill to date field`, async () => {
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const yyyy = now.getFullYear();

      await this.toDateField.fill(`${mm}-${dd}-${yyyy}`);
    });
  }
  async clickFindByDateButton() {
    await this.step(`Click find by date button`, async () => {
      await this.findByDateButton.click();
      await expect(this.transactionDetails).toBeVisible();
    });
  }
  async fillTransctionDateField() {
    await this.step(`Fill from date field`, async () => {
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const yyyy = now.getFullYear();

      await this.transactionDateField.fill(`${mm}-${dd}-${yyyy}`);
    });
  }
  async clickFindDateButton() {
    await this.step(`Click find by date button`, async () => {
      await this.findbyDateTodayButton.click();
      await expect(this.transactionDetails).toBeVisible();
    });
  }
  async fillFindByIdField(transactionId) {
    await this.step(`Fill find by id field`, async () => {
      await this.findByIdField.fill(transactionId);
    });
  }
  async clickFindByIdButton() {
    await this.step(`Click find by id button`, async () => {
      await this.findByIdButton.click();
      await expect(this.transactionDetails).toBeVisible();
    });
  }
}
