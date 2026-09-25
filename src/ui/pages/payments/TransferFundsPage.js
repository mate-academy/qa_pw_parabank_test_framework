import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

const REQUIRED_ACCOUNTS_NUMBER = 2;

export class TransferFundsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.transferFundsLink = page.getByRole('link', {
      name: 'Transfer Funds',
    });
    this.transferFundsHeading = page.getByRole('heading', {
      name: 'Transfer Funds',
    });
    this.amountInput = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', {
      name: 'Transfer',
    });
    this.successHeading = page.getByRole('heading', {
      name: 'Transfer Complete!',
    });
    this.rightPanel = page.locator('#rightPanel');
  }

  async open() {
    await this.step('Open the transfer funds page', async () => {
      await this.transferFundsLink.click();
      await expect(this.transferFundsHeading).toBeVisible();
    });
  }

  async transferBetweenDifferentAccounts(amount) {
    return await this.step(`Transfer $${amount} between accounts`, async () => {
      const accountOptions = this.fromAccountSelect.locator('option');

      await expect
        .poll(async () => await accountOptions.count())
        .toBeGreaterThanOrEqual(REQUIRED_ACCOUNTS_NUMBER);

      const accountIds = await accountOptions.evaluateAll(options =>
        options.map(option => option.value),
      );

      const [fromAccountId, toAccountId] = accountIds;

      await this.amountInput.fill(amount);
      await this.fromAccountSelect.selectOption(fromAccountId);
      await this.toAccountSelect.selectOption(toAccountId);
      await this.transferButton.click();

      return {
        fromAccountId,
        toAccountId,
      };
    });
  }

  async assertTransferIsSuccessful(amount, fromAccountId, toAccountId) {
    await this.step('Verify that the transfer is successful', async () => {
      await expect(this.successHeading).toBeVisible();
      await expect(this.rightPanel).toContainText(`$${amount}`);
      await expect(this.rightPanel).toContainText(`account #${fromAccountId}`);
      await expect(this.rightPanel).toContainText(`account #${toAccountId}`);
    });
  }
}
