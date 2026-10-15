import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });

    this.accountsOverviewHeading = page.getByRole('heading', {
      name: 'Accounts Overview',
    });

    this.errorMessage = page.locator('#rightPanel .error');
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async open() {
    await this.step('Open Sign In page', async () => {
      await this.page.goto('/parabank/index.htm');
    });
  }

  async fillUsername(username) {
    await this.step('Fill username', async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPassword(password) {
    await this.step('Fill password', async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLoginButton() {
    await this.step('Click Log In button', async () => {
      await this.loginButton.click();
    });
  }

  async signIn(username, password) {
    await this.step('Sign in user', async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.clickLoginButton();
    });
  }

  async logout() {
    await this.step('Log out user', async () => {
      await this.logoutLink.click();
    });
  }

  async assertLoginSuccessful() {
    await this.step('Assert login was successful', async () => {
      await expect(this.page).toHaveURL(/overview\.htm/);
      await expect(this.accountsOverviewHeading).toBeVisible();
    });
  }

  async assertLoginError(message) {
    await this.step(`Assert login error: ${message}`, async () => {
      await expect(this.errorMessage).toContainText(message);
    });
  }
}
