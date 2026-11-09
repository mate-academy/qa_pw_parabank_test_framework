import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.balanceAnotherAccount = page.getByRole('cell', { name: '$' }).nth(2);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertTransferFundsCorrect(expectedAmount = '200') {
    await this.step(
      `Assert balance in another account: ${expectedAmount}`,
      async () => {
        await expect(this.balanceAnotherAccount).toContainText(
          String(expectedAmount),
        );
      },
    );
  }
  async getFirstAccountId(page = this.page) {
    return await this.step('Get first account id', async () => {
      const link = page.locator('#accountTable a').first();
      await expect(link).toBeVisible();
      return (await link.innerText()).trim();
    });
  }
}
