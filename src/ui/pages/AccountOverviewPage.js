import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.pageTitle = page.locator('#showOverview h1.title');
    this.accountsTable = page.locator('#accountTable');
    this.accountLinks = page.locator('#accountTable tbody tr td a');
    this.totalRow = page.locator('#accountTable tbody tr', {
      hasText: 'Total',
    });
    this.errorMessage = page.locator('#showError p.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertPageTitleIsVisible() {
    await this.step(
      `Assert the 'Accounts Overview' page title is visible`,
      async () => {
        await expect(this.pageTitle).toHaveText('Accounts Overview');
      },
    );
  }

  async assertAccountIsListed(accountId) {
    await this.step(`Assert account '${accountId}' is listed`, async () => {
      await expect(
        this.page.getByRole('link', { name: accountId }),
      ).toBeVisible();
    });
  }

  async getFirstAccountId() {
    return await this.step(
      `Get the first account id from the table`,
      async () => {
        return await this.accountLinks.first().innerText();
      },
    );
  }

  async clickAccountLink(accountId) {
    await this.step(`Click the account '${accountId}' link`, async () => {
      await this.page.getByRole('link', { name: accountId }).click();
    });
  }

  async assertSingleAccountWithConsistentBalance() {
    await this.step(
      `Assert exactly one account is listed with a consistent balance`,
      async () => {
        await expect(this.accountLinks).toHaveCount(1);

        const accountRow = this.page.locator('#accountTable tbody tr').first();
        const cells = await accountRow.locator('td').allInnerTexts();
        const [, balanceText, availableText] = cells;

        expect(balanceText).toMatch(/^\$\d+\.\d{2}$/);
        expect(balanceText).toBe(availableText);
        await expect(this.totalRow).toContainText(balanceText);
      },
    );
  }
}
