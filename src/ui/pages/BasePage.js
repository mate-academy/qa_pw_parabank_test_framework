import { expect, testStep } from '../../common/helpers/pwHelpers';

const PAGE_OPEN_ATTEMPTS = 3;
const PAGE_READY_TIMEOUT = 15_000;

export class BasePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async openPage(path, readyLocator) {
    for (let attempt = 1; attempt <= PAGE_OPEN_ATTEMPTS; attempt += 1) {
      await this.page.goto(path);

      try {
        await expect(readyLocator).toBeVisible({
          timeout: PAGE_READY_TIMEOUT,
        });

        return;
      } catch (error) {
        if (attempt === PAGE_OPEN_ATTEMPTS) {
          throw error;
        }
      }
    }
  }
}
