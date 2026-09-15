import { expect, testStep } from '../../common/helpers/pwHelpers';
import { isDateInRange } from '../../common/helpers/dateHelpers';

export class TransactionDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.transactionId = page
      .getByRole('row')
      .filter({ hasText: 'Transaction ID:' })
      .getByRole('cell')
      .nth(1);

    this.date = page
      .getByRole('row')
      .filter({ hasText: 'Date:' })
      .getByRole('cell')
      .nth(1);

    this.amount = page
      .getByRole('row')
      .filter({ hasText: 'Amount:' })
      .getByRole('cell')
      .nth(1);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async getTransactionId() {
    return await this.step('Get transaction ID', async () => {
      return (await this.transactionId.textContent()).trim();
    });
  }

  async getTransactionDate() {
    return await this.step('Get transaction date', async () => {
      return (await this.date.textContent()).trim();
    });
  }

  async getTransactionAmount() {
    return await this.step('Get transaction amount', async () => {
      return (await this.amount.textContent()).trim();
    });
  }

  async verifyTransactionId(transactionId) {
    await this.step('Verify transaction ID', async () => {
      await expect(this.transactionId).toHaveText(transactionId);
    });
  }

  async verifyTransactionDate(date) {
    await this.step('Verify transaction date', async () => {
      await expect(this.date).toHaveText(date);
    });
  }

  async verifyTransactionDateInRange(fromDate, toDate) {
    await this.step(
      `Verify transaction date is within range: ${fromDate} - ${toDate}`,
      async () => {
        await expect(this.date).toBeVisible();

        const transactionDate = (await this.date.textContent()).trim();
        const dateRange = `${fromDate} - ${toDate}`;

        expect(
          isDateInRange(transactionDate, fromDate, toDate),
          `Transaction date ${transactionDate} should be in ${dateRange}`,
        ).toBe(true);
      },
    );
  }

  async verifyTransactionAmount(amount) {
    await this.step('Verify transaction amount', async () => {
      await expect(this.amount).toHaveText(amount);
    });
  }
}
