import { expect, testStep } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async open() {
    await this.page.goto('/');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  locator(value) {
    return this.page.locator('#leftPanel').getByRole('link', { name: value });
  }

  async clickLeftPanel(value) {
    await this.locator(value).click();
  }

  welcomeMessage(user) {
    return this.page.getByText(`Welcome ${user.firstName} ${user.lastName}`);
  }

  async assertYourWelcomeMessageIsVisible(user) {
    await this.step(`Assert the 'Welcome Message' is visible`, async () => {
      await expect(this.welcomeMessage(user)).toBeVisible();
    });
  }
}
