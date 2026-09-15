import { expect, testStep } from '../../common/helpers/pwHelpers';
import { ACCOUNT_TABLE_CELL_INDEX } from '../constants/accountConstants';

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountTable = page.locator('#accountTable');
    // <th> resolves to role "columnheader" only on newer Chromium builds;
    // older builds report "cell", so match the header cells by tag instead.
    this.accountColumn = this.accountTable.locator('thead th', {
      hasText: 'Account',
    });
    this.balanceColumn = this.accountTable.locator('thead th', {
      hasText: 'Balance*',
    });
    this.availableAmountColumn = this.accountTable.locator('thead th', {
      hasText: 'Available Amount',
    });
    this.totalBalance = page.locator('b').filter({ hasText: '$' });
    this.accountRows = this.accountTable
      .locator('tbody tr')
      .filter({ has: page.getByRole('link') });
    this.accountRow = index => this.accountRows.nth(index);
    this.accountLink = index => this.accountRow(index).getByRole('link');
    this.accountNumber = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.balance = page.locator('#balance');
    this.activityPeriodDropdown = page.locator('#month');
    this.transactionTypeDropdown = page.locator('#transactionType');
    this.firstTransaction = page.locator('#transactionTable tbody a').first();
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async goToAccountsOverview() {
    await this.step('Go to Accounts Overview', async () => {
      await this.page.goto('overview.htm');
    });
  }

  async verifyAccountOverviewTableDisplayed() {
    await this.step('Verify Account Overview table is displayed', async () => {
      await expect(this.accountTable).toBeVisible();
    });
  }

  async verifyAccountOverviewColumns() {
    await this.step('Verify Account Overview table columns', async () => {
      await expect(this.accountColumn).toBeVisible();
      await expect(this.balanceColumn).toBeVisible();
      await expect(this.availableAmountColumn).toBeVisible();
    });
  }

  async verifyBalanceDisplayed() {
    await this.step('Verify total balance is displayed', async () => {
      await expect(this.totalBalance).toBeVisible();
    });
  }

  async clickAccount(index = 0) {
    await this.step(`Click account at index: ${index}`, async () => {
      await this.accountLink(index).click();
    });
  }

  async getAccountNumber(index = 0) {
    return await this.step(
      `Get account number at index: ${index}`,
      async () => {
        return await this.accountLink(index).textContent();
      },
    );
  }

  async verifyAccountNumber(accountNumber) {
    await this.step('Verify account number', async () => {
      await expect(this.accountNumber).toHaveText(accountNumber);
    });
  }

  async getAccountBalance(index = 0) {
    return await this.step(
      `Get account balance at index: ${index}`,
      async () => {
        return await this.accountRow(index)
          .getByRole('cell')
          .nth(ACCOUNT_TABLE_CELL_INDEX.balance)
          .textContent();
      },
    );
  }

  async verifyBalance(balance) {
    await this.step('Verify account balance', async () => {
      await expect(this.balance).toHaveText(balance);
    });
  }

  async selectActivityPeriod(period) {
    await this.step(`Select Activity Period: ${period}`, async () => {
      await this.activityPeriodDropdown.selectOption(period);
    });
  }

  async verifySelectedActivityPeriod(period) {
    await this.step(`Verify selected Activity Period: ${period}`, async () => {
      await expect(
        this.activityPeriodDropdown.getByRole('option', { selected: true }),
      ).toHaveText(period);
    });
  }

  async selectTransactionType(type) {
    await this.step(`Select Transaction Type: ${type}`, async () => {
      await this.transactionTypeDropdown.selectOption(type);
    });
  }

  async verifySelectedTransactionType(type) {
    await this.step(`Verify selected Transaction Type: ${type}`, async () => {
      await expect(
        this.transactionTypeDropdown.getByRole('option', { selected: true }),
      ).toHaveText(type);
    });
  }

  async clickFirstTransaction() {
    await this.step('Click first transaction', async () => {
      await this.firstTransaction.click();
    });
  }

  async verifyAccountType(accountType) {
    await this.step(`Verify account type: ${accountType}`, async () => {
      await expect(this.accountType).toHaveText(accountType);
    });
  }
}
