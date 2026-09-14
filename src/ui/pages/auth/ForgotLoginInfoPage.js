import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class ForgotLoginInfo {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.submitButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });
  }

  locator(name) {
    return this.page.locator(`[id="${name}"]`);
  }

  fillField(name, value) {
    return this.step(`Fill the '${name}' field`, async () => {
      await this.locator(name).fill(value);
    });
  }

  async clickSumbitButton() {
    await this.step(`Click the 'Submit' button`, async () => {
      await this.submitButton.click();
    });
  }

  errorrMessage(message) {
    return this.page.getByText(message);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorrMessage(messageText)).toContainText(messageText);
    });
  }
}
