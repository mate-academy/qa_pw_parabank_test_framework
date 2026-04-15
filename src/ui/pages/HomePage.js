import { expect, testStep } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.welcomeTitle = page.getByRole('heading', { level: 1 });
    this.forgotLoginInfoLink = page.getByRole('link', { name: 'Forgot login info?' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertPageUrl(url) {
    await this.step(`Assert page URL`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }
  async open() {
    await this.step(`Open home page`, async () => {
      await this.page.goto('/parabank/index.htm');
    });
  }

  async clickForgotLoginInfoLink() {
    await this.step(`Click forgot login info link`, async () => {
      await this.forgotLoginInfoLink.click();
    });
  }

  async assertForgotLoginInfoLinkIsVisible() {
    await this.step(`Assert forgot login info link is visible`, async () => {
      await expect(this.forgotLoginInfoLink).toBeVisible();
    });
  }
}
