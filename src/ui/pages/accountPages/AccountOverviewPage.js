import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    // eslint-disable-next-line max-len
    this.accountPageTitle = this.page.getByRole('heading', { name: `Accounts Overview` });
    
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open () {
    await this.step(`Open "Accounts Overview" page`, async () => {
      await this.page.goto('/parabank/overview.htm');
    });
  }

  async assertAccountsOverviewIsShown() {
    await this.step(`Assert Accounts page is opened`, async () => {
      await expect(this.accountPageTitle).toBeVisible();
    });
  }

  async clickAccountNumber(accountNumber) {
  await this.step(`Click account number: ${accountNumber}`, async () => {
    await this.page.getByRole('link', { name: accountNumber }).click();
  });
}

  async getAccountNumber() {
  return await this.step('Get account number', async () => {
    return await this.page.locator('#accountTable tbody tr').first().locator('a').textContent();
  });
}


  async assertAccountBalance(accountNumber, expectedBalance) {
  await this.step(`Assert account ${accountNumber} has balance ${expectedBalance}`, async () => {
    const row = this.page.locator('#accountTable tbody tr').filter({ hasText: accountNumber });
    const balanceCell = row.locator('td').nth(1);
    await expect(balanceCell).toHaveText(expectedBalance);
  });
}
}