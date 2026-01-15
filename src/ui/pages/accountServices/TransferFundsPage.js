import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { PAGE_TITLES, TRANSFER_FUNDS_ERROR_MESSAGES } from '../../../constants/index.js';
import { checkInvalidAmountValidation, findVisibleElement, hasVisibleElement } from '../../../common/helpers/validationHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    
    this.title = page.locator('#rightPanel h1.title').first();
    
    this.amountInput = page.locator('[id="amount"]');
    this.fromAccountIdDropdown = page.locator('[id="fromAccountId"]');
    this.toAccountIdDropdown = page.locator('[id="toAccountId"]');
    
    this.transferButton = page.locator('input[value="Transfer"]');
    
    this.successTitle = page.locator('#showResult h1');
    this.errorMessage = page.locator('p[id="amount.errors"]').first();
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Transfer Funds page`, async () => {
      await this.page.goto('/parabank/transfer.htm');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async fillAmountInput(amount) {
    await this.step(`Fill Amount input`, async () => {
      await this.amountInput.fill(amount);
    });
  }

  async fillFromAccountIdDropdown(fromAccountId) {
    await this.step(`Fill From Account ID dropdown`, async () => {
      await this.fromAccountIdDropdown.selectOption(fromAccountId);
    });
  }

  async fillToAccountIdDropdown(toAccountId) {
    await this.step(`Fill To Account ID dropdown`, async () => {
      await this.toAccountIdDropdown.selectOption(toAccountId);
    });
  }

  async clickTransferButton() {
    await this.step(`Click Transfer button`, async () => {
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.transferButton.click(),
      ]);
    });
  }

  async assertSuccessTitleContainsText() {
    const titleText = PAGE_TITLES.TRANSFER_FUNDS_SUCCESS;
    await this.step(`Assert the '${titleText}' title is shown`, async () => {
      await expect(this.successTitle).toContainText(titleText);
    });
  }

  async assertErrorMessageContainsText(fieldNameError) {
    const messageText = TRANSFER_FUNDS_ERROR_MESSAGES[fieldNameError];
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      this.logger?.debug(`Checking error for field: ${fieldNameError}`);
      
      const visibleError = await findVisibleElement(this.page, 'p[id="amount.errors"]');
      
      if (visibleError) {
        await expect(visibleError).toContainText(messageText);
        this.logger?.debug(`Error confirmed for field: ${fieldNameError}`);
      } else {
        this.logger?.error(`No visible error message found for field: ${fieldNameError}`);
        throw new Error(`No visible error message found for field: ${fieldNameError}`);
      }
    });
  }

  async assertTitleContainsText() {
    const titleText = PAGE_TITLES.TRANSFER_FUNDS;
    await this.step(`Assert the '${titleText}' title is shown`, async () => {
      await expect(this.title).toContainText(titleText);
    });
  }

  async assertTransferFailedWithInvalidAmount(amount) {
    await this.step(`Assert transfer FAILED with invalid amount: ${amount}`, async () => {
      this.logger?.debug(`Validating transfer failed with amount: ${amount}`);
      
      await checkInvalidAmountValidation(
        this.page,
        this.successTitle,
        amount,
        this.logger,
        'transfer'
      );
      
      const hasAmountError = await hasVisibleElement(this.page, 'p[id="amount.errors"]');
      const hasGeneralError = await this.page.locator('#showError').isVisible().catch(() => false);
      
      this.logger?.debug(`hasAmountError=${hasAmountError}, hasGeneralError=${hasGeneralError}`);
      expect(hasAmountError || hasGeneralError).toBe(true);
    });
  }
}
