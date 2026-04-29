import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.pageTitle = page.getByText('Accounts Overview');
    this.accountsTable = page.locator('#accountTable');
    this.accountLinks = page.locator('#accountTable tbody tr td:first-child a');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Account Overview' page`, async () => {
      await this.page.goto('overview.htm');
    });
  }

  async getFirstAccountId() {
    return (await this.accountLinks.first().textContent()).trim();
  }

  async clickFirstAccountLink() {
    await this.step(`Click the first account link`, async () => {
      await this.accountLinks.first().click();
    });
  }

  async assertPageTitleVisible() {
    await this.step(`Assert 'Accounts Overview' title is visible`, async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  async assertAccountsTableVisible() {
    await this.step(`Assert accounts table is visible`, async () => {
      await expect(this.accountsTable).toBeVisible();
    });
  }
}
