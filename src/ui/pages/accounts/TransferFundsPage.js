import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.transferFundsLink = page.getByRole('link', {
      name: 'Transfer Funds',
    });

    this.transferFundsHeading = page.getByRole('heading', {
      name: 'Transfer Funds',
    });

    this.amountField = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');

    this.transferButton = page.getByRole('button', {
      name: 'Transfer',
      exact: true,
    });

    this.transferCompleteHeading = page.getByRole('heading', {
      name: 'Transfer Complete!',
    });

    this.transferResult = page.locator('#rightPanel');
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async open() {
    await this.step('Open Transfer Funds page', async () => {
      await this.transferFundsLink.click();
      await expect(this.transferFundsHeading).toBeVisible();
      await expect(this.fromAccountSelect).toBeVisible();
      await expect(this.toAccountSelect).toBeVisible();
    });
  }

  async fillAmount(amount) {
    await this.step(`Fill transfer amount: ${amount}`, async () => {
      await this.amountField.fill(String(amount));
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select source account: ${accountId}`, async () => {
      await this.fromAccountSelect.selectOption(accountId);
    });
  }

  async selectToAccount(accountId) {
    await this.step(`Select destination account: ${accountId}`, async () => {
      await this.toAccountSelect.selectOption(accountId);
    });
  }

  async getAvailableAccounts() {
    return await this.step('Get available transfer accounts', async () => {
      await expect
        .poll(
          async () => {
            return await this.fromAccountSelect.locator('option').count();
          },
          {
            message: 'Wait for at least two transfer accounts',
            timeout: 15000,
          },
        )
        .toBeGreaterThanOrEqual(2);

      return await this.fromAccountSelect
        .locator('option')
        .evaluateAll(options =>
          options.map(option => ({
            value: option.value,
            label: option.textContent.trim(),
          })),
        );
    });
  }

  async clickTransferButton() {
    await this.step('Click Transfer button', async () => {
      await this.transferButton.click();
    });
  }

  async assertTransferSuccessful(amount) {
    await this.step('Assert transfer was successful', async () => {
      await expect(this.transferCompleteHeading).toBeVisible();

      await expect(this.transferResult).toContainText(
        `$${Number(amount).toFixed(2)}`,
      );
    });
  }
}
