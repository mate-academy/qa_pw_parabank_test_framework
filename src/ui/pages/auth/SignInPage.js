import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;


    this.welcomeText = page.getByRole('heading', { level: 1 });
    this.errorMessage = page.locator('.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertErrorMessageContainsText(expectedMessage) {
    await this.step(`Assert that error message contains text: ${expectedMessage}`, async () => {
      await expect(this.errorMessage).toContainText(expectedMessage);
    });
  }
}
