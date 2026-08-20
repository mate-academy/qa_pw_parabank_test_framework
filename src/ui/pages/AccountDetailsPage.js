import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountIdText = page.locator('#accountId');
    this.accountTypeText = page.locator('#accountType');
    this.balanceText = page.locator('#balance');
    this.availableBalanceText = page.locator('#availableBalance');

    this.monthSelect = page.locator('#month');
    this.transactionTypeSelect = page.locator('#transactionType');
    this.goButton = page.getByRole('button', { name: 'Go' });

    this.noTransactionsMessage = page.locator('#noTransactions');
    this.transactionRows = page.locator('#transactionTable tbody tr');
    this.debitCells = page.locator(
      '#transactionTable tbody tr td:nth-child(3)',
    );
    this.creditCells = page.locator(
      '#transactionTable tbody tr td:nth-child(4)',
    );
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async selectType(type) {
    await this.step(`Select '${type}' as the transaction type`, async () => {
      await this.transactionTypeSelect.selectOption({ label: type });
    });
  }

  async clickGoButton() {
    await this.step(`Click the 'Go' button`, async () => {
      await this.goButton.click();
    });
  }

  async filterByType(type) {
    await this.selectType(type);
    await this.clickGoButton();
  }

  async assertFilteredResultsMatchType(type) {
    await this.step(
      `Assert only '${type}' transactions are shown`,
      async () => {
        await expect(this.transactionRows).not.toHaveCount(0);

        const debitTexts = await this.debitCells.allInnerTexts();
        const creditTexts = await this.creditCells.allInnerTexts();

        if (type === 'Debit') {
          debitTexts.forEach(text => expect(text.trim()).not.toBe(''));
          creditTexts.forEach(text => expect(text.trim()).toBe(''));
        } else {
          creditTexts.forEach(text => expect(text.trim()).not.toBe(''));
          debitTexts.forEach(text => expect(text.trim()).toBe(''));
        }
      },
    );
  }
}
