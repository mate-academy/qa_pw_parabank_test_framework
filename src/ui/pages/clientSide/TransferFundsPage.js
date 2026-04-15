import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.amountInput         = page.locator('#amount');
    this.fromAccountSelect   = page.locator('#fromAccountId');
    this.toAccountSelect     = page.locator('#toAccountId');
    this.transferButton      = page.getByRole('button', { name: 'Transfer' });

    this.errorMessages       = page.locator('#amount\\.errors');

    this.resultTitle         = page.locator('#showResult h1.title');
    this.resultAmount        = page.locator('#amountResult');
    this.resultFromAccountId = page.locator('#fromAccountIdResult');
    this.resultToAccountId   = page.locator('#toAccountIdResult');

    this.serverErrorBlock    = page.locator('#showError');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
  async open() {
    await this.step(`Open 'Open New Account' page`, async () => {
      await this.page.goto(`/parabank/transfer.htm`);
    });
  }

  async transferFunds(amount, fromId, toId) {
    return await this.step(`Transfer ${amount} from #${fromId} to #${toId}`, async () => {
      await this.amountInput.fill(String(amount));
      await this.fromAccountSelect.selectOption({ value: String(fromId) });
      await this.toAccountSelect.selectOption({ value: String(toId) });

      // Налаштовуємо очікування відповіді від сервера
      const responsePromise = this.page.waitForResponse(res => 
        res.url().includes('/services_proxy/bank/transfer') && res.request().method() === 'POST'
      );

      await this.transferButton.click();
      return await responsePromise;
    });
  }

  async getTransferResultData() {
    return await this.step('Get transfer result details', async () => {
      await expect(this.resultTitle).toBeVisible();
      return {
        amount: (await this.resultAmount.textContent()).trim(),
        fromId: (await this.resultFromAccountId.textContent()).trim(),
        toId: (await this.resultToAccountId.textContent()).trim()
      };
    });
  }
  
  async assertTransferSuccess(amount, fromId, toId) {
    await this.step('Assert transfer was successful', async () => {
      await expect(this.resultTitle).toHaveText('Transfer Complete!');
      await expect(this.resultAmount).toContainText(String(amount));
      await expect(this.resultFromAccountId).toHaveText(String(fromId));
      await expect(this.resultToAccountId).toHaveText(String(toId));
    });
  }

  async assertErrorMessageVisible(expectedText) {
    await this.step(`Assert error message "${expectedText}" is visible`, async () => {
      const error = this.errorMessages.filter({ hasText: expectedText });
      await expect(error).toBeVisible();
    });
  }
}