import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class TransactionDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.transactionIdRow = page.locator('tr').filter({ hasText: 'Transaction ID' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

async getTransactionDate() {
  return await this.step('Get transaction date', async () => {
    return await this.page.locator('#transactionTable tbody tr').first().locator('td').first().textContent();
  });
}

async getTransactionId() {
  return await this.step('Get transaction ID', async () => {
    const row = this.page.locator('tr').filter({ hasText: 'Transaction ID' });
    return await row.locator('td').nth(1).textContent();
  });
}

  async assertTransactionIdIsShown(expectedTransactionId) {
    await this.step(`Assert transaction ID is shown: ${expectedTransactionId}`, async () => {
      const actualTransactionId = await this.getTransactionId();
      expect(actualTransactionId).toBe(expectedTransactionId);
    });
  }

  async assertTransactionDateIsShown(expectedTransactionDate) {
    await this.step(`Assert transaction date is shown: ${expectedTransactionDate}`, async () => {
      const transactionDateRow = this.page.locator('tr').filter({ hasText: 'Date' });
      const actualTransactionDate = transactionDateRow.locator('td').nth(1);
      await expect(actualTransactionDate).toHaveText(expectedTransactionDate);
    });
}
}