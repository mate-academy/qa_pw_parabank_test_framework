import { expect } from '@playwright/test';
import { LoggedInPage } from './LoggedInPage';
import { formatCurrency } from '../../../common/helpers/currency';

export class OverviewPage extends LoggedInPage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'overview.htm';
    this.pageName = 'Accounts Overview page';

    const accountsOverview = this.page.locator('#showOverview');
    const accountTable = accountsOverview.locator('#accountTable');
    this.accountsOverview = {
      accountTable,
      accountLinks: accountTable.locator('tbody a'),
      totalBalance: accountTable
        .locator('tbody tr')
        .filter({ hasText: 'Total' })
        .locator('td')
        .nth(1),
    };
  }

  accountLink(accountId) {
    return this.accountsOverview.accountTable.getByRole('link', {
      name: String(accountId),
      exact: true,
    });
  }

  accountRow(accountId) {
    return this.accountsOverview.accountTable.locator('tbody tr').filter({
      has: this.page.getByRole('link', { name: String(accountId), exact: true }),
    });
  }

  async getAccountIds() {
    return await this.step('Read account ids from overview', async () => {
      await expect(this.accountsOverview.accountLinks.first()).toBeVisible();
      const accountIds = await this.accountsOverview.accountLinks.allTextContents();

      return accountIds.map(accountId => accountId.trim());
    });
  }

  async assertAccounts(accounts) {
    await this.step('Assert accounts and their balances', async () => {
      await expect(this.accountsOverview.accountLinks).toHaveCount(accounts.length);

      for (const account of accounts) {
        const cells = this.accountRow(account.accountId).locator('td');

        await expect(cells.nth(1)).toHaveText(formatCurrency(account.balance));
        await expect(cells.nth(2)).toHaveText(formatCurrency(account.availableBalance));
      }
    });
  }

  async assertTotal(total) {
    await this.step(`Assert accounts total is ${formatCurrency(total)}`, async () => {
      await expect(this.accountsOverview.totalBalance).toHaveText(formatCurrency(total));
    });
  }

  async openAccount(accountId) {
    await this.click(this.accountLink(accountId), `Open account ${accountId}`);
    await this.step(`Assert account ${accountId} page is open`, async () => {
      await expect(this.page).toHaveURL(new RegExp(`activity\\.htm\\?id=${accountId}`));
    });
  }
}
