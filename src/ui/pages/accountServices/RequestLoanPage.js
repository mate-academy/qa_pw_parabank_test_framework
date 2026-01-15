import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { PAGE_TITLES, REQUEST_LOAN_ERROR_MESSAGES } from '../../../constants/index.js';

export class RequestLoanPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    
    this.title = page.locator('#requestLoanForm h1.title');
    
    this.loanAmountInput = page.locator('#amount');
    this.downPaymentInput = page.locator('#downPayment');
    this.fromAccountIdDropdown = page.locator('#fromAccountId');
    
    this.applyNowButton = page.locator('input[type="button"][value="Apply Now"]');
    
    this.resultTitle = page.locator('#requestLoanResult h1.title');
    this.loanStatus = page.locator('#loanStatus');
    this.approvedMessage = page.locator('#loanRequestApproved');
    this.deniedMessage = page.locator('#loanRequestDenied p.error');
    this.newAccountId = page.locator('#newAccountId');
    
    this.errorContainer = page.locator('#requestLoanError');
    this.errorMessage = page.locator('#requestLoanError p.error');
    this.internalError = page.locator('p.error:has-text("An internal error has occurred")');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Request Loan page`, async () => {
      await this.page.goto('/parabank/requestloan.htm');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async fillLoanAmountInput(loanAmount) {
    await this.step(`Fill Loan Amount input with "${loanAmount}"`, async () => {
      await this.loanAmountInput.fill(loanAmount);
    });
  }

  async fillDownPaymentInput(downPayment) {
    await this.step(`Fill Down Payment input with "${downPayment}"`, async () => {
      await this.downPaymentInput.fill(downPayment);
    });
  }

  async selectFromAccountId(accountId) {
    await this.step(`Select From Account ID "${accountId}"`, async () => {
      await this.fromAccountIdDropdown.selectOption(accountId);
    });
  }

  async clickApplyNowButton() {
    await this.step(`Click Apply Now button`, async () => {
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.applyNowButton.click(),
      ]);
    });
  }

  async assertLoanRequestProcessed() {
    await this.step(`Assert loan request is processed`, async () => {
      await expect(this.resultTitle).toContainText('Loan Request Processed');
    });
  }

  async assertLoanApprovedOrDenied() {
    await this.step(`Assert loan is approved or denied`, async () => {
      await expect(this.resultTitle).toBeVisible();
      
      const statusText = await this.loanStatus.textContent();
      expect(['Approved', 'Denied']).toContain(statusText);
    });
  }

  async assertErrorShownOrLoanNotApproved() {
    await this.step(`Assert error is shown (bug: site accepts invalid values)`, async () => {
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      
      const hasErrorPage = await this.errorContainer.isVisible().catch(() => false);
      this.logger?.debug(`hasErrorPage=${hasErrorPage}`);
      
      if (hasErrorPage) {
        const hasInternalError = await this.internalError.isVisible().catch(() => false);
        this.logger?.debug(`hasInternalError=${hasInternalError}`);
        
        if (hasInternalError) {
          this.logger?.warn(`INTERNAL SERVER ERROR - server crashed instead of validating`);
          throw new Error(
            `Server returned "internal error" instead of validating input\n` +
            `Expected: Client-side validation error or proper rejection message.\n` +
            `Actual: "An internal error has occurred and has been logged."`
          );
        }
        
        return;
      }
      
      const hasResult = await this.resultTitle.isVisible().catch(() => false);
      this.logger?.debug(`hasResult=${hasResult}`);
      
      if (!hasResult) {
        return;
      }
      
      expect(hasErrorPage).toBe(true);
    });
  }
}
