import { expect, testStep } from '../../helpers/pwHelpers';

export class BasePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open(url) {
    await this.step(`Navigate to ${url}`, async () => {
      await this.page.goto(url);
      await expect(this.page).toHaveURL(url);
    });
  }
}
