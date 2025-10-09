import { BasePage } from './basePage';
import { expect } from '../../helpers/pwHelpers';

export class AccountOverviewPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'https://parabank.parasoft.com/parabank/overview.htm';
  }

  async open() {
    await super.open(this.url);
  }

  async assertOverviewVisible() {
    await this.step(`Verify account overview is visible`, async () => {
      await expect(this.page.locator('h1.title')).toHaveText('Accounts Overview');
    });
  }

  async openAccountDetails(accountId) {
    await this.step(`Open account ${accountId} details`, async () => {
      await this.page.click(`a[href*="activity.htm?id=${accountId}"]`);
    });
  }

  async assertAccountDetailsVisible() {
    await this.step(`Verify account details visible`, async () => {
      await expect(this.page.locator('#accountId')).toBeVisible();
    });
  }
}
