import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.tableBody = page.locator('#accountTable tbody');
    this.accountLinks = this.tableBody.locator('tr td:first-child a');
    this.totalRow = this.tableBody.getByRole('row').last();
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Navigate to 'Accounts Overview' page`, async () => {
      await this.page.goto('overview.htm');
    });
  }

  async getAccountDataFromTableRow(tableRowIndex) {
    return await this.step(
      `Get Account Data from row ${tableRowIndex}`,
      async () => {
        const row = this.tableBody.getByRole('row').nth(tableRowIndex);

        const firstCell = await row.locator('td:nth-child(1)').innerText();
        const secondCell = await row.locator('td:nth-child(2)').innerText();
        const thirdCell = await row.locator('td:nth-child(3)').innerText();

        const accountData = {
          accountId: firstCell,
          balance: secondCell,
          availableBalance: thirdCell,
        };
        return accountData;
      },
    );
  }

  async assertUserHasOnlyOneAccount() {
    await this.step(`Assert user has only one account`, async () => {
      await expect(this.accountLinks).toHaveCount(1);
    });
  }

  async assertTotalRowIsVisible() {
    await this.step(`Assert total row is shown in table`, async () => {
      await expect(this.totalRow).toContainText('Total');
    });
  }

  async assertWelcomeMessageShowsFullName(firstName, lastName) {
    await this.step(`Assert welcome message is shown`, async () => {
      await expect(this.page.locator('#leftPanel')).toContainText(
        `Welcome ${firstName} ${lastName}`,
      );
    });
  }

  async assertAccountHasCorrectBalance(accountId, balance) {
    await this.step(
      `Assert Account with ID=${accountId} has balance=${balance}`,
      async () => {
        const row = this.tableBody.locator('tr', { hasText: accountId });
        const balanceCell = row.locator('td:nth-child(2)');

        await expect(balanceCell).toHaveText(balance);
      },
    );
  }
}
