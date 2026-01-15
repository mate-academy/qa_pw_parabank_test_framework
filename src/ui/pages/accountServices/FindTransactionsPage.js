import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { PAGE_TITLES, FIND_TRANSACTIONS_ERROR_MESSAGES } from '../../../constants/index.js';

export class FindTransactionsPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    this.title = page.locator('#formContainer h1.title');

    this.selectAnAccountDropdown = page.locator('#accountId');
    this.findTransactionIdInput = page.locator('#transactionId');
    this.findByTransactionIdButton = page.locator('#findById');
    this.findByDateInput = page.locator('#transactionDate');
    this.findByDateButton = page.locator('#findByDate');
    this.findByDateBetweenFromInput = page.locator('#fromDate');
    this.findByDateBetweenToInput = page.locator('#toDate');
    this.findByDateBetweenButton = page.locator('#findByDateRange');
    this.findAmountInput = page.locator('#amount');
    this.findByAmountButton = page.locator('#findByAmount');

    this.resultContainer = page.locator('#resultContainer');
    this.resultTitle = page.locator('#resultContainer h1.title');
    this.findTransactionsTable = page.locator('#transactionTable');
    
    this.errorContainer = page.locator('#errorContainer');
    this.errorMessage = page.locator('#errorContainer p.error');
    this.transactionIdError = page.locator('#transactionIdError');
    this.transactionDateError = page.locator('#transactionDateError');
    this.dateRangeError = page.locator('#dateRangeError');
    this.amountError = page.locator('#amountError');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Find Transactions page`, async () => {
      await this.page.goto('/parabank/findtrans.htm');
      await this.page.waitForLoadState('networkidle');
    });
  }
  
  async fillSelectAnAccountDropdown(account) {
    await this.step(`Fill Select An Account dropdown`, async () => {
      await this.selectAnAccountDropdown.selectOption(account);
    });
  }

  async fillFindTransactionIdInput(transactionId) {
    await this.step(`Fill Find Transaction ID input with "${transactionId}"`, async () => {
      await this.findTransactionIdInput.fill(transactionId);
    });
  }

  async clickFindByTransactionIdButton() {
    await this.step(`Click Find By Transaction ID button`, async () => {
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.findByTransactionIdButton.click(),
      ]);
    });
  }

  async fillFindByDateInput(date) {
    await this.step(`Fill Find By Date input with "${date}"`, async () => {
      await this.findByDateInput.fill(date);
    });
  }

  async clickFindByDateButton() {
    await this.step(`Click Find By Date button`, async () => {
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.findByDateButton.click(),
      ]);
    });
  }

  async fillFindByDateBetweenFromInput(fromDate) {
    await this.step(`Fill Find By Date Between From input with "${fromDate}"`, async () => {
      await this.findByDateBetweenFromInput.fill(fromDate);
    });
  }

  async fillFindByDateBetweenToInput(toDate) {
    await this.step(`Fill Find By Date Between To input with "${toDate}"`, async () => {
      await this.findByDateBetweenToInput.fill(toDate);
    });
  }

  async clickFindByDateBetweenButton() {
    await this.step(`Click Find By Date Between button`, async () => {
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.findByDateBetweenButton.click(),
      ]);
    });
  }

  async fillFindAmountInput(amount) {
    await this.step(`Fill Find Amount input with "${amount}"`, async () => {
      await this.findAmountInput.fill(amount);
    });
  }

  async clickFindByAmountButton() {
    await this.step(`Click Find By Amount button`, async () => {
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        this.findByAmountButton.click(),
      ]);
    });
  }

  async assertResultsDisplayed() {
    await this.step('Assert search results are displayed', async () => {
      this.logger?.debug('Checking if search results are displayed');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
      
      const hasTable = await this.findTransactionsTable.isVisible().catch(() => false);
      const hasResultContainer = await this.resultContainer.isVisible().catch(() => false);
      
      const hasError = await this.errorContainer.isVisible().catch(() => false);
      
      if (hasError) {
        this.logger?.error('ERROR shown for positive test case!');
        const errorText = await this.errorContainer.textContent().catch(() => 'N/A');
        throw new Error(`Expected results, but got error: ${errorText}`);
      }
      
      expect(hasTable || hasResultContainer).toBe(true);
      this.logger?.info('Search results displayed successfully');
    });
  }

  async assertErrorShown() {
    await this.step('Assert search error is displayed', async () => {
      this.logger?.debug('Checking if search error is displayed');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
      
      const hasErrorContainer = await this.errorContainer.isVisible().catch(() => false);
      const hasAmountError = await this.amountError.isVisible().catch(() => false);
      const hasTransactionIdError = await this.transactionIdError.isVisible().catch(() => false);
      const hasTransactionDateError = await this.transactionDateError.isVisible().catch(() => false);
      const hasDateRangeError = await this.dateRangeError.isVisible().catch(() => false);
      
      const hasAnyError = hasErrorContainer || hasAmountError || hasTransactionIdError || 
                          hasTransactionDateError || hasDateRangeError;
      
      this.logger?.debug(`Errors: container=${hasErrorContainer}, amount=${hasAmountError}, ` +
                        `id=${hasTransactionIdError}, date=${hasTransactionDateError}, range=${hasDateRangeError}`);
      
      const hasTable = await this.findTransactionsTable.isVisible().catch(() => false);
      const hasResultContainer = await this.resultContainer.isVisible().catch(() => false);
      
      if (hasTable || hasResultContainer) {
        this.logger?.error('RESULTS shown for negative test case!');
        throw new Error('results were displayed!');
      }
      
      if (!hasAnyError) {
        this.logger?.error('NO ERROR shown for negative test case!');
        throw new Error('Expected error message to be displayed, but none found!');
      }
      
      expect(hasAnyError).toBe(true);
      this.logger?.info('Search error displayed');
    });
  }
}
