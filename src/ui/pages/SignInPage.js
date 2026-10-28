import { expect, testStep } from '../../common/helpers/pwHelpers';

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');

    this.logInButton = page.getByRole('button', {
      name: 'Log In',
    });

    this.errorMessage = page.locator('.error');

    this.forgotLoginInfoLink = page.getByRole('link', {
      name: 'Forgot login info?',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign In' page`, async () => {
      await this.page.goto('index.htm');
    });
  }

  async fillUsernameInput(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameInput.fill(username);
    });
  }

  async fillPasswordInput(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordInput.fill(password);
    });
  }

  async clickLogInButton() {
    await this.step(`Click the 'Log In' button`, async () => {
      await this.logInButton.click();
    });
  }

  async assertLogInButtonIsVisible() {
    await this.step(`Assert 'Log In' button is visible`, async () => {
      await expect(this.logInButton).toBeVisible();
    });
  }

  async assertErrorMessageContainsText(message) {
    await this.step(`Assert error message`, async () => {
      await expect(this.errorMessage).toContainText(message);
    });
  }

  async clickForgotLoginInfoLink() {
    await this.step(`Click 'Forgot login info?' link`, async () => {
      await this.forgotLoginInfoLink.click();
    });
  }
}
