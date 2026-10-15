import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountDetailsHeading = page.getByRole('heading', {
      name: 'Account Details',
    });

    this.accountId = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.balance = page.locator('#balance');
    this.availableBalance = page.locator('#availableBalance');

    this.accountActivityHeading = page.getByRole('heading', {
      name: 'Account Activity',
    });

    this.monthSelect = page.locator('#month');
    this.transactionTypeSelect = page.locator('#transactionType');
    this.goButton = page.getByRole('button', { name: 'Go' });

    this.transactionsTable = page.locator('#transactionTable');
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async assertAccountDetailsVisible() {
    await this.step('Assert account details are visible', async () => {
      await expect(this.accountDetailsHeading).toBeVisible();
      await expect(this.accountId).toBeVisible();
      await expect(this.accountType).toBeVisible();
      await expect(this.balance).toBeVisible();
      await expect(this.availableBalance).toBeVisible();
    });
  }

  async assertAccountActivityVisible() {
    await this.step('Assert account activity is visible', async () => {
      await expect(this.accountActivityHeading).toBeVisible();
      await expect(this.monthSelect).toBeVisible();
      await expect(this.transactionTypeSelect).toBeVisible();
      await expect(this.goButton).toBeVisible();
      await expect(this.transactionsTable).toBeVisible();
    });
  }

  async filterTransactions(month, transactionType) {
    await this.step(
      `Filter transactions by ${month} / ${transactionType}`,
      async () => {
        await this.monthSelect.selectOption({ label: month });

        await this.transactionTypeSelect.selectOption({
          label: transactionType,
        });

        await this.goButton.click();
      },
    );
  }

  async assertSelectedFilters(month, transactionType) {
    await this.step('Assert selected transaction filters', async () => {
      await expect(this.monthSelect.locator('option:checked')).toHaveText(
        month,
      );

      await expect(
        this.transactionTypeSelect.locator('option:checked'),
      ).toHaveText(transactionType);
    });
  }
}
