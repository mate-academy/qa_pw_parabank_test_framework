import { expect, testStep } from '../../common/helpers/pwHelpers';

export class LookupPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.loginUsername = page.getByText(/Username:/);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async verifyUsername(username) {
    await this.step('Verify username is displayed', async () => {
      await expect(this.loginUsername).toContainText(`Username: ${username}`);
    });
  }

  async verifyErrorMessage(message) {
    await this.step('Verify validation error message', async () => {
      await expect(this.page.getByText(message)).toBeVisible();
    });
  }
}
