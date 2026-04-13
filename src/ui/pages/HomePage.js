import { expect, testStep } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.welcomeTitle = page.getByRole('heading', { level: 1 });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertPageUrl(url) {
    await this.step(`Assert page URL`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }

  async clickSomething() {
    await this.step(`Click something`, async () => {
      // example method
    });
  }

  async assertSomething() {
    await this.step(`Assert something`, async () => {
      expect(true).toBe(true);
    });
  }
}
