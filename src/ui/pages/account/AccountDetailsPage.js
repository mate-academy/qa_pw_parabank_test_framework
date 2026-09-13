import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    //Acount Details
    this.accountDetailsSection = page.getByText('Account Details');

    this.accountNumber = page.getByText('Account Number:');
    this.accountID = page.locator('#accountId');

    this.accountType = page.getByText('Account Type:');

    this.balance = page.getByText('Balance:');

    this.available = page.getByText('Available:');

    //Activity Section

    this.activityPeriodRow = page.getByRole('row', {
      name: /Activity Period:/,
    });

    this.activityPeriodSelect = this.activityPeriodRow.getByRole('combobox');

    this.typeRow = page.getByRole('row', {
      name: /Type:/,
    });

    this.typeSelect = this.typeRow.getByRole('combobox');
    this.goButton = page.getByRole('button', { name: 'Go' });

    this.transactionLinks = page.getByRole('link', {
      name: /Funds Transfer/,
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickGoButton() {
    await this.step(`Click 'Go' button`, async () => {
      await this.goButton.click();
    });
  }

  async clickLastTransaction() {
    await this.step('Click the last transaction', async () => {
      await this.transactionLinks.first().click();
    });
  }

  async assertAccountDetailsAreVisible() {
    await this.step(`Assert the 'Account Details' is displayed`, async () => {
      await expect(this.accountDetailsSection).toBeVisible();

      await expect(this.accountNumber).toBeVisible();

      await expect(this.accountType).toBeVisible();

      await expect(this.accountID).not.toBeEmpty();

      await expect(this.balance).toBeVisible();

      await expect(this.available).toBeVisible();
    });
  }

  async selectActivityPeriod(month) {
    await this.step(`Select '${month}' Activity Period`, async () => {
      await this.activityPeriodSelect.selectOption({
        label: month,
      });
    });
  }
  async selectTransactionType(type) {
    await this.step(`Select '${type}' transaction type`, async () => {
      await this.typeSelect.selectOption({
        label: type,
      });
    });
  }

  async assertDefaultActivityFilters() {
    await this.step(
      `Assert default Account Activity filters`,

      async () => {
        await expect(this.activityPeriodSelect).toHaveValue('All');

        await expect(this.typeSelect).toHaveValue('All');
      },
    );
  }

  async filterActivity(period, type) {
    await this.step(
      `Filter Account Activity by '${period}' and '${type}'`,

      async () => {
        await this.activityPeriodSelect.selectOption({
          label: period,
        });

        await this.typeSelect.selectOption({
          label: type,
        });

        await this.clickGoButton();
      },
    );
  }
}
