import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.signInHeading = page.getByRole('heading', { name: 'Customer Login' });
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.signInButton = page.getByRole('button', { name: 'Log In' });
    this.errorHeading = page.getByRole('heading', {
      name: 'Error!',
      level: 1,
    });
    this.forgotLoginInfo = page.getByRole('link', {
      name: 'Forgot login info?',
    });
  }

  async clickForgotLoginInfo() {
    await this.step(`Click the 'Forgot Login Info' button`, async () => {
      await this.forgotLoginInfo.click();
    });
  }

  errorrMessage(message) {
    return this.page.getByText(message);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.page.goto('/');
  }

  async fillUsernameField(username) {
    await this.step(`Fill the 'Email' field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickSignInButton() {
    await this.step(`Click the 'Sign in' button`, async () => {
      await this.signInButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorrMessage(messageText)).toContainText(messageText);
    });
  }

  async assertSignInHeadingIsDisplayed() {
    await this.step(`Assert the 'SignIn Heading' is shown`, async () => {
      await expect(this.signInHeading).toBeVisible();
    });
  }
}
