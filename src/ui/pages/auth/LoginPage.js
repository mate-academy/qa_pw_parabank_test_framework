import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { LOGIN_ERROR_MESSAGES } from '../../../constants/index.js';

export class LoginPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.forgotLoginInfoLink = page.locator('//a[text()="Forgot login info?"]');

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginErrorMessage = page.locator('#rightPanel p.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Login page`, async () => {
      await this.page.goto('/parabank/index.htm');
    });
  }

  async clickLoginButton() {
    await this.step(`Click Login button`, async () => {
      await this.loginButton.click();
    });
  }

  async clickForgotLoginInfoLink() {
    await this.step(`Click Forgot login info link`, async () => {
      await this.forgotLoginInfoLink.click();
    });
  }

  async fillUsernameInput(username) {
    await this.step(`Fill Username input`, async () => {
      await this.usernameInput.fill(username);
    });
  }

  async fillPasswordInput(password) {
    await this.step(`Fill Password input`, async () => {
      await this.passwordInput.fill(password);
    });
  }

  async assertErrorMessageContainsText(fieldNameError) {
    const messageText = LOGIN_ERROR_MESSAGES[fieldNameError];
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.loginErrorMessage).toContainText(messageText);
    });
  }

  async assertSuccessLogin() {
    await this.step('Assert login success', async () => {
      await expect(this.page.locator('#rightPanel h1.title').first()).toContainText(
        'Accounts Overview',
      );
    });
  }

  async assertErrorMessageContainsOneOf(errorKeys) {
    await this.step('Assert error message is displayed', async () => {
      await expect(this.loginErrorMessage).toBeVisible();
      const errorText = await this.loginErrorMessage.textContent();
      const validErrors = errorKeys.map((key) => LOGIN_ERROR_MESSAGES[key]);
      const hasValidError = validErrors.some((err) => errorText.includes(err));
      expect(hasValidError).toBeTruthy();
    });
  }
}
