import { testStep, expect } from '../../common/helpers/pwHelpers';

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountsOverview = page.getByRole('heading', {
      name: 'Accounts Overview',
    });
    this.accountColumn = page.getByRole('cell', { name: 'Account' });
    this.balanceColumn = page.getByRole('cell', { name: 'Balance*' });
    this.availableAmountColumn = page.getByRole('cell', {
      name: 'Available Amount',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertAccountsOverviewIsVisible() {
    await this.step(
      'Checking the visibility of "Accounts Overview"',
      async () => {
        await expect(this.accountsOverview).toBeVisible();
      },
    );
  }

  async assertAccountColumnIsVisible() {
    await this.step('Checking the visibility of "Account" column', async () => {
      await expect(this.accountColumn).toBeVisible();
    });
  }

  async assertBalanceColumnIsVisible() {
    await this.step(
      'Checking the visibility of "Balance*" column',
      async () => {
        await expect(this.balanceColumn).toBeVisible();
      },
    );
  }

  async assertAvailableAmountColumnIsVisible() {
    await this.step(
      'Checking the visibility of "Available Amount" column',
      async () => {
        await expect(this.availableAmountColumn).toBeVisible();
      },
    );
  }
}
