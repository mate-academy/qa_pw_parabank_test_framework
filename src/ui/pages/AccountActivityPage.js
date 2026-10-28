import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountActivityPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.accountDetailsTitle = page.getByRole('heading', {
      name: 'Account Details',
    });

    this.accountActivityTitle = page.getByRole('heading', {
      name: 'Account Activity',
    });

    this.accountNumber = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.balance = page.locator('#balance');
    this.availableBalance = page.locator('#availableBalance');

    this.monthSelect = page.locator('#month');
    this.transactionTypeSelect = page.locator('#transactionType');

    this.goButton = page.getByRole('button', {
      name: 'Go',
    });

    this.transactionTable = page.locator('#transactionTable');
    this.noTransactionsMessage = page.locator('#noTransactions');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertAccountDetailsTitleIsVisible() {
    await this.step(`Assert 'Account Details' title is visible`, async () => {
      await expect(this.accountDetailsTitle).toBeVisible();
    });
  }

  async assertAccountActivityTitleIsVisible() {
    await this.step(`Assert 'Account Activity' title is visible`, async () => {
      await expect(this.accountActivityTitle).toBeVisible();
    });
  }

  async assertAccountDetailsAreVisible() {
    await this.step(`Assert account details are visible`, async () => {
      await expect(this.accountNumber).toBeVisible();
      await expect(this.accountType).toBeVisible();
      await expect(this.balance).toBeVisible();
      await expect(this.availableBalance).toBeVisible();
    });
  }

  async selectActivityPeriod(period) {
    await this.step(`Select activity period '${period}'`, async () => {
      await this.monthSelect.selectOption(period);
    });
  }

  async selectTransactionType(type) {
    await this.step(`Select transaction type '${type}'`, async () => {
      await this.transactionTypeSelect.selectOption(type);
    });
  }

  async clickGoButton() {
    await this.step(`Click 'Go' button`, async () => {
      await this.goButton.click();
    });
  }

  async assertActivityPeriodIsSelected(period) {
    await this.step(
      `Assert activity period '${period}' is selected`,
      async () => {
        await expect(this.monthSelect).toHaveValue(period);
      },
    );
  }

  async assertTransactionTypeIsSelected(type) {
    await this.step(
      `Assert transaction type '${type}' is selected`,
      async () => {
        await expect(this.transactionTypeSelect).toHaveValue(type);
      },
    );
  }
  async assertAccountTypeContainsText(accountType) {
    await this.step(`Assert account type is '${accountType}'`, async () => {
      await expect(this.accountType).toContainText(accountType);
    });
  }
}
