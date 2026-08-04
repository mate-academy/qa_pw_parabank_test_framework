import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class AccountDetailsPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Account Details' });
    this.accountNumberCell = page.locator('#accountId');
    this.accountTypeCell = page.locator('#accountType');
    this.balanceCell = page.locator('#balance');
    this.availableCell = page.locator('#availableBalance');

    this.activityHeading = page.getByRole('heading', {
      name: 'Account Activity',
    });
    this.monthSelect = page.locator('#month');
    this.transactionTypeSelect = page.locator('#transactionType');
    this.goButton = page.getByRole('button', { name: 'Go' });
    this.noTransactionsText = page.locator('#noTransactions');
    this.transactionRows = page.locator('#transactionTable tbody tr');
  }

  transactionRow(description, amount) {
    const row = this.transactionRows.filter({ hasText: description });

    if (amount === undefined) {
      return row;
    }

    return row.filter({ hasText: `$${Number(amount).toFixed(2)}` });
  }

  async open(accountNumber) {
    await this.step(
      `Open Account Details page for #${accountNumber}`,
      async () => {
        await this.page.goto(`/parabank/activity.htm?id=${accountNumber}`);
      },
    );
  }

  async selectMonth(month) {
    await this.step(`Select month "${month}"`, async () => {
      await this.monthSelect.selectOption(month);
    });
  }

  async selectTransactionType(transactionType) {
    await this.step(
      `Select transaction type "${transactionType}"`,
      async () => {
        await this.transactionTypeSelect.selectOption(transactionType);
      },
    );
  }

  async clickGoButton() {
    await this.step('Click Go button', async () => {
      await this.goButton.click();
    });
  }

  async assertOpened() {
    await this.step('Assert Account Details page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertAccountNumber(accountNumber) {
    await this.step(`Assert Account Number is "${accountNumber}"`, async () => {
      await expect(this.accountNumberCell).toHaveText(accountNumber);
    });
  }

  async assertAccountType(accountType) {
    await this.step(`Assert Account Type is "${accountType}"`, async () => {
      await expect(this.accountTypeCell).toHaveText(accountType);
    });
  }

  async assertBalance(amount) {
    await this.step(`Assert Balance is "${amount}"`, async () => {
      await expect(this.balanceCell).toHaveText(amount);
    });
  }

  async assertAvailable(amount) {
    await this.step(`Assert Available is "${amount}"`, async () => {
      await expect(this.availableCell).toHaveText(amount);
    });
  }

  async assertActivityOpened() {
    await this.step('Assert Account Activity section is shown', async () => {
      await expect(this.activityHeading).toBeVisible();
    });
  }

  async assertNoTransactionsFound() {
    await this.step('Assert no transactions are found', async () => {
      await expect(this.noTransactionsText).toBeVisible();
    });
  }

  async assertTransactionVisible(description, amount) {
    await this.step(
      `Assert transaction "${description}" (${amount}) is visible`,
      async () => {
        await expect(this.transactionRow(description, amount)).toBeVisible();
      },
    );
  }

  async assertTransactionNotVisible(description, amount) {
    await this.step(
      `Assert transaction "${description}" (${amount}) is not visible`,
      async () => {
        await expect(this.transactionRow(description, amount)).toHaveCount(0);
      },
    );
  }

  async assertTransactionCount(description, amount, count) {
    await this.step(
      `Assert ${count} "${description}" (${amount}) transaction(s) are visible`,
      async () => {
        await expect(this.transactionRow(description, amount)).toHaveCount(count);
      },
    );
  }
}
