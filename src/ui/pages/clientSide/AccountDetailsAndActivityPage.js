import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountId          = page.locator('#accountId');
    this.accountType        = page.locator('#accountType');
    this.balance            = page.locator('#balance');
    this.availableBalance   = page.locator('#availableBalance');

    this.activityPeriodSelect = page.locator('#month');
    this.transactionTypeSelect = page.locator('#transactionType');
    this.goButton             = page.getByRole('button', { name: 'Go' });
    this.noTransactionsMessage = page.locator('#noTransactions');
    this.transactionTable      = page.locator('#transactionTable');
    this.transactionRows       = page.locator('#transactionTable tbody tr');

    this.errorBlock = page.locator('#error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async getAccountId() {
    return await this.step('Get account ID from details', async () => {
      await expect(this.accountId).not.toBeEmpty();
      return (await this.accountId.textContent()).trim();
    });
  }

  async getAccountType() {
    return await this.step('Get account type', async () => {
      return (await this.accountType.textContent()).trim();
    });
  }

  async getBalance() {
    return await this.step('Get account balance', async () => {
      return (await this.balance.textContent()).trim();
    });
  }

  async getAvailableBalance() {
    return await this.step('Get available balance', async () => {
      return (await this.availableBalance.textContent()).trim();
    });
  }

  async filterActivity(period = 'All', type = 'All') {
    await this.step(`Filter activity by period: ${period} and type: ${type}`, async () => {
      await this.activityPeriodSelect.selectOption({ label: period });
      await this.transactionTypeSelect.selectOption({ label: type });
      await this.goButton.click();
    });
  }

  async assertAccountDetails(expectedData) {
    await this.step('Assert account details are correct', async () => {
      if (expectedData.id) await expect(this.accountId).toHaveText(expectedData.id);
      if (expectedData.type) await expect(this.accountType).toHaveText(expectedData.type);
      if (expectedData.balance) await expect(this.balance).toHaveText(expectedData.balance);
      if (expectedData.availableBalance) await expect(this.availableBalance).toHaveText(expectedData.availableBalance);
    });
  }

  async assertNoTransactionsVisible() {
    await this.step('Assert "No transactions found" message is visible', async () => {
      await expect(this.noTransactionsMessage).toBeVisible();
      await expect(this.transactionTable).toBeHidden();
    });
  }

  async assertTransactionsTableIsVisible() {
    await this.step('Assert transactions table is visible', async () => {
      await expect(this.transactionTable).toBeVisible();
    });
  }
  async assertTransactionsTableIsHidden() {
    await this.step('Assert transactions table is hidden', async () => {
      await expect(this.transactionTable).toBeHidden();
    });
  }

  async assertPageUrl(accountId) {
    await this.step(`Assert 'Account Details' page url is correct`, async () => {
      await expect(this.page).toHaveURL(`/parabank/activity.htm?id=${accountId}`);
    });
  }

  async assertActivityFiltersAreVisible() {
    await this.step(`Assert activity filters are visible`, async () => {
      await expect(this.activityPeriodSelect).toBeVisible();
      await expect(this.transactionTypeSelect).toBeVisible();
      await expect(this.goButton).toBeVisible();
    });
  }
}