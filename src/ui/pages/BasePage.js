import { testStep } from '../../common/helpers/pwHelpers';

export class BasePage {
  constructor(page, userLabel = '') {
    this.page = page;
    this.userLabel = userLabel;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userLabel);
  }

  async openAndAssert(...args) {
    await this.open(...args);
    await this.assertOpened();
  }
}
