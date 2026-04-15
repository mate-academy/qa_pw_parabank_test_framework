import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.pageTitle        = page.locator('#showOverview h1.title');
    this.accountTable     = page.locator('#accountTable');
    this.accountTableRows = page.locator('#accountTable tbody tr');
    this.totalBalance     = page.locator('#accountTable tbody tr:last-child td:nth-child(2) b');
    this.errorBlock       = page.locator('#showError');
    this.errorMessage     = page.locator('#showError p.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
  async assertPageUrl() {
    await this.step(`Assert 'Accounts Overview' page url is correct`, async () => {
      await expect(this.page).toHaveURL('/parabank/overview.htm');
    });
  }

  async open() {
    await this.step(`Open 'Accounts Overview' page`, async () => {
      await this.page.goto(`/parabank/overview.htm`);
    });
  }

  getAccountRow(accountId) {
    return this.page.locator(`#accountTable tbody tr td a[href*="id=${accountId}"]`).locator('../..');
  }
  getAccountLink(accountId) {
    return this.page.locator(`#accountTable tbody tr td a[href*="id=${accountId}"]`);
  }

  async assertPageTitleIsVisible() {
    await this.step(`Assert 'Accounts Overview' title is visible`, async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.pageTitle).toHaveText('Accounts Overview');
    });
  }
  async getFirstAccountId() {
    await this.step(`Get first account ID`, async () => {});
    const link = this.page.locator('#accountTable tbody tr:first-child td:first-child a');
    const href = await link.getAttribute('href');
    return href.split('id=')[1];
  }
  async getAccountBalance(accountId) {
    await this.step(`Get account balance for account '${accountId}'`, async () => {});
    const row = this.getAccountRow(accountId);
    const balance = await row.getByRole('cell', { name: '$' }).first().textContent();
    return balance;
  }
  async assertAccountTableIsVisible() {
    await this.step(`Assert accounts table is visible`, async () => {
      await expect(this.accountTable).toBeVisible();
    });
  }

  async assertAccountIsVisible(accountId) {
    await this.step(`Assert account '${accountId}' is visible`, async () => {
      await expect(this.getAccountLink(accountId)).toBeVisible();
    });
  }

  async assertAccountBalance(accountId, expectedBalance) {
    await this.step(`Assert account '${accountId}' balance is '${expectedBalance}'`, async () => {
      const row = this.getAccountRow(accountId);
      await expect(row.getByRole('cell', { name: '$' }).first()).toHaveText(expectedBalance);
    });
  }

  async assertAccountAvailableAmount(accountId, expectedAmount) {
    await this.step(`Assert account '${accountId}' available amount is '${expectedAmount}'`, async () => {
      const row = this.getAccountRow(accountId);
      await expect(row.locator('td:nth-child(3)')).toHaveText(expectedAmount);
    });
  }

  async assertTotalBalance(expectedTotal) {
    await this.step(`Assert total balance is '${expectedTotal}'`, async () => {
      await expect(this.totalBalance).toHaveText(expectedTotal);
    });
  }

  async assertErrorIsVisible() {
    await this.step(`Assert error block is visible`, async () => {
      await expect(this.errorBlock).toBeVisible();
    });
  }

  async assertErrorMessage(messageText) {
    await this.step(`Assert error message '${messageText}' is shown`, async () => {
      await expect(this.errorMessage).toHaveText(messageText);
    });
  }
}