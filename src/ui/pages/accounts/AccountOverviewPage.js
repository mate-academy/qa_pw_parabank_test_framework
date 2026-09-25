import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class AccountOverviewPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.accountOverviewLink = page.getByRole('link', {
      name: 'Accounts Overview',
    });
    this.accountOverviewHeading = page.getByRole('heading', {
      name: 'Accounts Overview',
    });
    this.accountTable = page.locator('#accountTable');
    this.accountLinks = this.accountTable.locator('tbody a');
    this.logoutLink = page.getByRole('link', {
      name: 'Log Out',
    });
  }

  async open() {
    await this.step('Open the account overview page', async () => {
      await this.accountOverviewLink.click();
    });
  }

  async assertAccountOverviewIsVisible() {
    await this.step('Verify that the account overview is visible', async () => {
      await expect(this.accountOverviewHeading).toBeVisible();
      await expect(this.logoutLink).toBeVisible();
    });
  }

  async assertAccountSummaryIsDisplayed() {
    await this.step(
      'Verify that the account summary is displayed',
      async () => {
        await expect(this.accountTable).toBeVisible();
        await expect(this.accountTable).toContainText('Account');
        await expect(this.accountTable).toContainText('Balance');
        await expect(this.accountTable).toContainText('Available Amount');
        await expect(this.accountLinks.first()).toBeVisible();
      },
    );
  }

  async openFirstAccountDetails() {
    return await this.step('Open the first account details', async () => {
      const firstAccountLink = this.accountLinks.first();
      const accountNumber = (await firstAccountLink.innerText()).trim();

      await firstAccountLink.click();

      return accountNumber;
    });
  }

  async logout() {
    await this.step('Log out from the account', async () => {
      await this.logoutLink.click();
    });
  }
}
