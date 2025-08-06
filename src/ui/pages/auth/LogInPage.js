import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { ERROR_TITLE } from '../../constants/authMessages';

export class LogInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    // Fields
    this.rightPanelTitle = page.locator('#rightPanel h1.title');
    this.rightPanelError = page.locator('#rightPanel p').first();
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertErrorMessageContainsText(message) {
    await this.step(`Assert 'Log in' error is shown`, async () => {
      await this.rightPanelTitle.waitFor({ state: 'visible' });
      await expect(this.rightPanelTitle).toHaveText(ERROR_TITLE);
      await expect(this.rightPanelError).toHaveText(message);
    });
  }
}
