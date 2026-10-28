import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountsOverviewTitle = page.getByRole('heading', {
      name: 'Accounts Overview',
    });

    this.logOutLink = page.getByRole('link', {
      name: 'Log Out',
    });

    this.accountTable = page.locator('#accountTable');

    this.accountColumn = page.locator('#accountTable th').filter({
      hasText: 'Account',
    });

    this.balanceColumn = page.locator('#accountTable th').filter({
      hasText: 'Balance*',
    });

    this.availableAmountColumn = page.locator('#accountTable th').filter({
      hasText: 'Available Amount',
    });

    this.accountsOverviewLink = page.getByRole('link', {
      name: 'Accounts Overview',
    });

    this.totalRow = page.getByText('Total');

    this.accountLinks = page.locator(
      '#accountTable tbody a[href*="activity.htm?id="]',
    );
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertAccountsOverviewTitleIsVisible() {
    await this.step(`Assert 'Accounts Overview' title is visible`, async () => {
      await expect(this.accountsOverviewTitle).toBeVisible();
    });
  }

  async assertLogOutLinkIsVisible() {
    await this.step(`Assert 'Log Out' link is visible`, async () => {
      await expect(this.logOutLink).toBeVisible();
    });
  }

  async clickLogOutLink() {
    await this.step(`Click 'Log Out' link`, async () => {
      await this.logOutLink.click();
    });
  }

  async assertAccountTableIsVisible() {
    await this.step(`Assert account table is visible`, async () => {
      await expect(this.accountTable).toBeVisible();
    });
  }

  async assertAccountTableColumnsAreVisible() {
    await this.step(`Assert account table columns are visible`, async () => {
      await expect(this.accountColumn).toBeVisible();
      await expect(this.balanceColumn).toBeVisible();
      await expect(this.availableAmountColumn).toBeVisible();
    });
  }

  async assertTotalRowIsVisible() {
    await this.step(`Assert total row is visible`, async () => {
      await expect(this.totalRow).toBeVisible();
    });
  }

  async assertAccountLinkIsVisible() {
    await this.step(`Assert account link is visible`, async () => {
      await expect(this.accountLinks.first()).toBeVisible();
    });
  }

  async clickFirstAccountLink() {
    await this.step(`Click first account link`, async () => {
      await this.accountLinks.first().click();
    });
  }

  async clickAccountsOverviewLink() {
    await this.step(`Click 'Accounts Overview' link`, async () => {
      await this.accountsOverviewLink.click();
    });
  }
}
