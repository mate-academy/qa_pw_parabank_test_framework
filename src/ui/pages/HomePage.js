import { expect, testStep } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
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
