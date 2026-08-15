import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Customer Login' });
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.errorHeading = page.getByRole('heading', { name: 'Error!' });
  }

  errorMessage(text) {
    return this.page.getByText(text);
  }

  async open() {
    await this.step('Open Home page', async () => {
      await this.page.goto('/parabank/index.htm');
    });
  }

  async fillUsername(value) {
    await this.step(`Fill Username with "${value}"`, async () => {
      await this.usernameInput.fill(value);
    });
  }

  async fillPassword(value) {
    await this.step('Fill Password', async () => {
      await this.passwordInput.fill(value);
    });
  }

  async clickLoginButton() {
    await this.step('Click Log In button', async () => {
      await this.loginButton.click();
    });
  }

  async assertOpened() {
    await this.step('Assert Home page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertLoginError(message) {
    await this.step(`Assert login error "${message}"`, async () => {
      await expect(this.errorHeading).toBeVisible();
      await expect(this.errorMessage(message)).toBeVisible();
    });
  }
}
