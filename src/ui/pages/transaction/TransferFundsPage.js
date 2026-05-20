import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.fromAccountIdDropdown = page.locator('#fromAccountId');
    this.toAccountIdDropdown = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.errorMessage = page.locator('#showError p.error');
    this.amountResult = page.locator('#amountResult');
    this.fromAccountIdResult = page.locator('#fromAccountIdResult');
    this.toAccountIdResult = page.locator('#toAccountIdResult');
    this.transferCompleteHeading = page.locator('#showResult .title');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Navigate to 'Transfer Funds' page`, async () => {
      await this.page.goto(`transfer.htm`);
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill 'Amount' field`, async () => {
      await this.amountField.fill(`${amount}`);
    });
  }

  async selectFromAccountId(fromAccountId) {
    await this.step(`Select From Account ID='${fromAccountId}'`, async () => {
      await this.fromAccountIdDropdown.selectOption(fromAccountId);
    });
  }

  async selectToAccountId(toAccountId) {
    await this.step(`Select To Account ID='${toAccountId}'`, async () => {
      await this.toAccountIdDropdown.selectOption(toAccountId);
    });
  }

  async clickTransferButton() {
    await this.step(`Click 'Transfer' button`, async () => {
      await this.transferButton.click();
    });
  }

  async assertErrorMessageHasText(message) {
    await this.step(`Assert the '${message}' is shown`, async () => {
      await expect(this.errorMessage).toHaveText(message);
    });
  }

  async assertAmountResultHasText(amount) {
    await this.step(
      `Assert the transferred amount of '${amount}' is shown`,
      async () => {
        await expect(this.amountResult).toHaveText(
          `$${Number(amount).toFixed(2)}`,
        );
      },
    );
  }

  async assertFromAccountIdResultHasText(fromAccountId) {
    await this.step(
      `Assert From Account ID result is '${fromAccountId}'`,
      async () => {
        await expect(this.fromAccountIdResult).toHaveText(`${fromAccountId}`);
      },
    );
  }

  async assertToAccountIdResultHasText(toAccountId) {
    await this.step(
      `Assert To Account ID result is '${toAccountId}'`,
      async () => {
        await expect(this.toAccountIdResult).toHaveText(`${toAccountId}`);
      },
    );
  }

  async assertTransferCompleteHeadingHasText(message) {
    await this.step(
      `Assert 'Transfer Complete' heading shows '${message}'`,
      async () => {
        await expect(this.transferCompleteHeading).toHaveText(message);
      },
    );
  }
}
