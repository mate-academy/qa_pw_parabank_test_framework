import { expect, testStep } from '../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.transferFundsLink = page.getByRole('link', {
      name: 'Transfer Funds',
    });

    this.transferFundsTitle = page.getByRole('heading', {
      name: 'Transfer Funds',
    });

    this.amountInput = page.locator('#amount');

    this.fromAccountSelect = page.locator('#fromAccountId');

    this.toAccountSelect = page.locator('#toAccountId');

    this.transferButton = page.getByRole('button', {
      name: 'Transfer',
    });

    this.transferCompleteTitle = page.getByRole('heading', {
      name: 'Transfer Complete!',
    });

    this.amountResult = page.locator('#amountResult');

    this.fromAccountIdResult = page.locator('#fromAccountIdResult');

    this.toAccountIdResult = page.locator('#toAccountIdResult');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickTransferFundsLink() {
    await this.step(`Click 'Transfer Funds' link`, async () => {
      await this.transferFundsLink.click();
    });
  }

  async assertTransferFundsTitleIsVisible() {
    await this.step(`Assert 'Transfer Funds' title is visible`, async () => {
      await expect(this.transferFundsTitle).toBeVisible();
    });
  }

  async fillAmountInput(amount) {
    await this.step(`Fill transfer amount '${amount}'`, async () => {
      await this.amountInput.fill(String(amount));
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select from account '${accountId}'`, async () => {
      await this.fromAccountSelect.selectOption(String(accountId));
    });
  }

  async selectToAccount(accountId) {
    await this.step(`Select to account '${accountId}'`, async () => {
      await this.toAccountSelect.selectOption(String(accountId));
    });
  }

  async clickTransferButton() {
    await this.step(`Click 'Transfer' button`, async () => {
      await this.transferButton.click();
    });
  }

  async assertTransferCompletedSuccessfully() {
    await this.step(`Assert transfer was completed successfully`, async () => {
      await expect(this.transferCompleteTitle).toBeVisible();
    });
  }

  async assertTransferredAmount(expectedAmount) {
    await this.step(
      `Assert transferred amount is '$${Number(expectedAmount).toFixed(2)}'`,
      async () => {
        await expect(this.amountResult).toHaveText(
          `$${Number(expectedAmount).toFixed(2)}`,
        );
      },
    );
  }

  async assertFromAccountId(accountId) {
    await this.step(`Assert from account is '${accountId}'`, async () => {
      await expect(this.fromAccountIdResult).toHaveText(String(accountId));
    });
  }

  async assertToAccountId(accountId) {
    await this.step(`Assert to account is '${accountId}'`, async () => {
      await expect(this.toAccountIdResult).toHaveText(String(accountId));
    });
  }
  async getAccountIds() {
    return await this.step(`Get account IDs`, async () => {
      return await this.fromAccountSelect
        .locator('option')
        .evaluateAll(options => options.map(option => option.value));
    });
  }
  async assertAtLeastTwoAccountsAreAvailable() {
    await this.step(`Assert at least two accounts are available`, async () => {
      await expect(this.fromAccountSelect.locator('option')).toHaveCount(2, {
        timeout: 10000,
      });

      await expect(this.toAccountSelect.locator('option')).toHaveCount(2, {
        timeout: 10000,
      });
    });
  }
}
