import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class FindTransactionsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.findTransactionsLink = page.getByRole('link', {
      name: 'Find Transactions',
    });
    this.findTransactionsHeading = page.getByRole('heading', {
      name: 'Find Transactions',
    });
    this.accountSelect = page.locator('#accountId');

    this.transactionIdInput = page.locator('#transactionId');
    this.transactionIdSearchButton = this.transactionIdInput.locator(
      'xpath=following::button[1]',
    );

    this.amountInput = page.locator('#amount');
    this.amountSearchButton = this.amountInput.locator(
      'xpath=following::button[1]',
    );

    this.resultsHeading = page.getByRole('heading', {
      name: 'Transaction Results',
    });
    this.transactionTable = page.locator('#transactionTable');
    this.firstTransactionRow = this.transactionTable
      .locator('tbody tr')
      .first();
    this.firstTransactionLink = this.firstTransactionRow.locator('a').first();
  }

  async open() {
    await this.step('Open the find transactions page', async () => {
      await this.findTransactionsLink.click();
      await expect(this.findTransactionsHeading).toBeVisible();
    });
  }

  async selectAccount(accountId) {
    await this.step(`Select account ${accountId}`, async () => {
      const accountOption = this.accountSelect.locator(
        `option[value="${accountId}"]`,
      );

      await expect(accountOption).toBeAttached();
      await this.accountSelect.selectOption(accountId);
    });
  }

  async findByAmount(accountId, amount) {
    await this.selectAccount(accountId);

    await this.step(`Find a transaction by amount $${amount}`, async () => {
      await this.amountInput.fill(amount);
      await this.amountSearchButton.click();
    });
  }

  async findByTransactionId(accountId, transactionId) {
    await this.selectAccount(accountId);

    await this.step(`Find transaction ${transactionId}`, async () => {
      await this.transactionIdInput.fill(transactionId);
      await this.transactionIdSearchButton.click();
    });
  }

  async assertDebitTransactionIsDisplayed(amount) {
    await this.step(
      'Verify that the debit transaction is displayed',
      async () => {
        const debitCell = this.firstTransactionRow.locator('td').nth(2);

        await expect(this.resultsHeading).toBeVisible();
        await expect(this.transactionTable).toBeVisible();
        await expect(this.firstTransactionRow).toContainText(
          'Funds Transfer Sent',
        );
        await expect(debitCell).toContainText(`$${amount}`);
      },
    );
  }

  async getFirstTransactionId() {
    return await this.step('Get the found transaction ID', async () => {
      await expect(this.firstTransactionLink).toHaveAttribute('href', /id=\d+/);

      const transactionUrl =
        await this.firstTransactionLink.getAttribute('href');
      const transactionId = new URL(
        transactionUrl,
        this.page.url(),
      ).searchParams.get('id');

      expect(transactionId).not.toBeNull();

      return transactionId;
    });
  }

  async assertTransactionIdIsDisplayed(transactionId) {
    await this.step(`Verify transaction ${transactionId}`, async () => {
      await expect(this.resultsHeading).toBeVisible();
      await expect(this.firstTransactionLink).toHaveAttribute(
        'href',
        new RegExp(`id=${transactionId}$`),
      );
    });
  }
}
