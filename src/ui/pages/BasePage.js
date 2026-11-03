import { expect } from '@playwright/test';
import { testStep } from '../../common/helpers/pwHelpers';

export class BasePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.url = 'index.htm';
    this.pageName = 'Home page';

    this.welcomeMessage = this.page.locator('#leftPanel p.smallText');

    const loginPanel = this.page.locator('#loginPanel');
    this.loginPanel = {
      root: loginPanel,
      usernameField: loginPanel.locator('input[name="username"]'),
      passwordField: loginPanel.locator('input[name="password"]'),
      loginButton: loginPanel.getByRole('button', { name: 'Log In' }),
    };
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Go to ${this.pageName}`, async () => {
      await this.page.goto(this.url);
    });
  }

  async click(locator, title) {
    await this.step(title, async () => {
      await locator.click();
    });
  }

  async fillField(locator, value, title) {
    await this.step(`Fill field ${title}`, async () => {
      await locator.fill(value);
    });
  }

  async submitSignInForm(user) {
    await this.fillField(
      this.loginPanel.usernameField,
      user.username,
      'Username',
    );
    await this.fillField(
      this.loginPanel.passwordField,
      user.password,
      'Password',
    );
    await this.click(this.loginPanel.loginButton, 'Sign In');
  }

  async assertLoggedOut() {
    await this.step('Assert user is logged out', async () => {
      await expect(this.loginPanel.root).toBeVisible();
      await expect(this.loginPanel.loginButton).toBeVisible();
      await expect(
        this.page.getByRole('link', { name: 'Log Out', exact: true }),
      ).toBeHidden();
      await expect(this.welcomeMessage).toBeHidden();
    });
  }

  async assertErrorMessage(locator, message) {
    await this.step('Assert error message is visible', async () => {
      await expect(locator).toBeVisible();
      await expect(locator).toContainText(message);
    });
  }
}
