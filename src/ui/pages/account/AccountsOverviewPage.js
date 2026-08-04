import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';
import { ACCOUNT_ACCESS_DENIED_ERROR } from '../../../common/constants/account/accountMessages';

export class AccountsOverviewPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Accounts Overview' });
    this.accountRows = page
      .locator('#accountTable tbody tr')
      .filter({ has: page.locator('a') });
    this.totalRow = page
      .locator('#accountTable tbody tr')
      .filter({ hasText: 'Total' });
    this.accessDeniedHeading = page.getByRole('heading', { name: 'Error!' });
    this.accessDeniedText = page.getByText(ACCOUNT_ACCESS_DENIED_ERROR);
  }

  welcomeText(firstName, lastName) {
    return this.page.getByText(`Welcome ${firstName} ${lastName}`);
  }

  firstAccountRow() {
    return this.accountRows.first();
  }

  accountLink() {
    return this.firstAccountRow().locator('a');
  }

  balanceCell() {
    return this.firstAccountRow().locator('td').nth(1);
  }

  availableCell() {
    return this.firstAccountRow().locator('td').nth(2);
  }

  totalCell() {
    return this.totalRow.locator('td').nth(1);
  }

  accountRowByNumber(accountNumber) {
    return this.accountRows.filter({ hasText: accountNumber });
  }

  accountLinkByNumber(accountNumber) {
    return this.accountRowByNumber(accountNumber).locator('a');
  }

  balanceCellByNumber(accountNumber) {
    return this.accountRowByNumber(accountNumber).locator('td').nth(1);
  }

  availableCellByNumber(accountNumber) {
    return this.accountRowByNumber(accountNumber).locator('td').nth(2);
  }

  async open() {
    await this.step('Open Accounts Overview page', async () => {
      await this.page.goto('/parabank/overview.htm');
    });
  }

  async assertOpened() {
    await this.step('Assert Accounts Overview page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertWelcomeMessage(firstName, lastName) {
    await this.step(
      `Assert welcome message for "${firstName} ${lastName}"`,
      async () => {
        await expect(this.welcomeText(firstName, lastName)).toBeVisible();
      },
    );
  }

  async assertSingleAccountRow() {
    await this.step('Assert exactly one account row is shown', async () => {
      await expect(this.accountRows).toHaveCount(1);
    });
  }

  async assertAccountLinkVisible() {
    await this.step('Assert account number is a link', async () => {
      await expect(this.accountLink()).toBeVisible();
    });
  }

  async assertBalanceFormatted() {
    await this.step('Assert Balance is a formatted currency amount', async () => {
      await expect(this.balanceCell()).toHaveText(/^\$[\d,]+\.\d{2}$/);
    });
  }

  async assertAvailableAmountFormatted() {
    await this.step(
      'Assert Available Amount is a formatted currency amount',
      async () => {
        await expect(this.availableCell()).toHaveText(/^\$[\d,]+\.\d{2}$/);
      },
    );
  }

  async assertBalanceEqualsAvailableAmount() {
    await this.step('Assert Balance equals Available Amount', async () => {
      const [balanceText, availableText] = await Promise.all([
        this.balanceCell().textContent(),
        this.availableCell().textContent(),
      ]);

      expect(balanceText).toBe(availableText);
    });
  }

  async assertTotalEqualsAccountBalance() {
    await this.step('Assert Total equals the account balance', async () => {
      const [balanceText, totalText] = await Promise.all([
        this.balanceCell().textContent(),
        this.totalCell().textContent(),
      ]);

      expect(totalText).toBe(balanceText);
    });
  }

  async assertAccountBalance(accountNumber, expectedBalance) {
    const formattedBalance = `$${Number(expectedBalance).toFixed(2)}`;

    await this.step(
      `Assert account #${accountNumber} balance is "${formattedBalance}"`,
      async () => {
        await expect(this.accountLinkByNumber(accountNumber)).toBeVisible();
        await expect(this.balanceCellByNumber(accountNumber)).toHaveText(
          formattedBalance,
        );
        await expect(this.availableCellByNumber(accountNumber)).toHaveText(
          formattedBalance,
        );
      },
    );
  }

  async assertAccessDenied() {
    await this.step(
      'Assert account data is not accessible without login',
      async () => {
        await expect(this.accessDeniedHeading).toBeVisible();
        await expect(this.accessDeniedText).toBeVisible();
      },
    );
  }
}
