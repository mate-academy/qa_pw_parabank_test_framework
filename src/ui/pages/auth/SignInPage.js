import { testStep, expect } from '../../../common/helpers/pwHelpers';

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });
    this.errorMessage = page.locator('p.error');
    this.linkForgotLoginInfo = page.getByRole('link', {
      name: 'Forgot login info?',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign in' page`, async () => {
      await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    });
  }

  async fillUsernameField(username) {
    await this.step('Fill the "Username" field', async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step('Fill the "Password" field', async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLogInButton() {
    await this.step('Click the "Log In" button', async () => {
      await this.logInButton.click();
    });
  }

  async clickLinkForgotLoginInfo() {
    await this.step('Click the "Forgot Login Info" link', async () => {
      await this.linkForgotLoginInfo.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
