import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { PAGE_TITLES } from '../../../constants/index.js';

export class AccountsOverviewPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    this.title = page.locator('#rightPanel h1.title').first();
    this.accountTable = page.locator('#accountTable');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Accounts Overview page`, async () => {
      await this.page.goto('/parabank/overview.htm');
      await this.page.waitForLoadState('networkidle');

      await this.page.locator('#accountTable').waitFor({ state: 'visible', timeout: 10000 });
    });
  }

  async assertTitleContainsText() {
    const titleText = PAGE_TITLES.ACCOUNTS_OVERVIEW;
    await this.step(`Assert the '${titleText}' title is shown`, async () => {
      await expect(this.title).toContainText(titleText);
    });
  }
  
  async assertAccountTableIsVisible() {
    await this.step(`Assert the Account table is visible`, async () => {
      await expect(this.accountTable).toBeVisible();
    });
  }
}