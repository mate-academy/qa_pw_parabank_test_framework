import { expect, testStep } from '../../../common/helpers/pwHelpers';
import {
  ACCOUNT_DETAILS_SELECTORS,
  ACCOUNT_DETAILS_TITLES,
} from '../../../constants/index.js';

export class AccountDetailsPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    
    this.detailsTitle = page.locator(ACCOUNT_DETAILS_SELECTORS.DETAILS_TITLE).first();
    this.accountId = page.locator(ACCOUNT_DETAILS_SELECTORS.ACCOUNT_ID);
    this.accountType = page.locator(ACCOUNT_DETAILS_SELECTORS.ACCOUNT_TYPE);
    this.balance = page.locator(ACCOUNT_DETAILS_SELECTORS.BALANCE);
    this.availableBalance = page.locator(ACCOUNT_DETAILS_SELECTORS.AVAILABLE_BALANCE);
    
    this.activityPeriodDropdown = page.locator(ACCOUNT_DETAILS_SELECTORS.ACTIVITY_PERIOD_DROPDOWN);
    this.activityTypeDropdown = page.locator(ACCOUNT_DETAILS_SELECTORS.ACTIVITY_TYPE_DROPDOWN);
    
    this.transactionTable = page.locator(ACCOUNT_DETAILS_SELECTORS.TRANSACTION_TABLE);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertAccountDetailsPageDisplayed() {
    await this.step('Assert Account Details page is displayed', async () => {
      this.logger?.debug('Checking Account Details page');
      await expect(this.detailsTitle).toContainText(ACCOUNT_DETAILS_TITLES.ACCOUNT_DETAILS);
      this.logger?.debug('Account Details page confirmed');
    });
  }

  async assertAccountIdContains(accountId) {
    await this.step(`Assert Account ID contains: ${accountId}`, async () => {
      this.logger?.debug(`Checking Account ID: ${accountId}`);
      await expect(this.accountId).toContainText(accountId);
      this.logger?.debug('Account ID confirmed');
    });
  }

  async assertActivityFiltersVisible() {
    await this.step('Assert activity filters are visible', async () => {
      this.logger?.debug('Checking activity filters');
      await expect(this.activityPeriodDropdown).toBeVisible();
      await expect(this.activityTypeDropdown).toBeVisible();
      this.logger?.debug('Activity filters confirmed');
    });
  }
}
