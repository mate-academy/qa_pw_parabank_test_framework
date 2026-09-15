import { expect, testStep } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.forgotLoginInfoLink = this.page.getByRole('link', {
      name: 'Forgot login info?',
    });
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step('Open Home page', async () => {
      await this.page.goto('/parabank/index.htm');
    });
  }

  async clickRegister() {
    await this.step('Click Register link', async () => {
      await this.registerLink.click();
    });
  }

  async clickForgotLoginInfo() {
    await this.step('Click Forgot login info link', async () => {
      await this.forgotLoginInfoLink.click();
    });
  }

  async verifyLoggedOut() {
    await this.step('Verify user is logged out', async () => {
      await expect(this.loginButton).toBeVisible();
    });
  }
}
