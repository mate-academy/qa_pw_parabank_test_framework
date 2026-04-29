import { expect, testStep } from '../../common/helpers/pwHelpers';

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillUsernameField(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLogInButton() {
    await this.step(`Click the 'Log in' button`, async () => {
      await this.logInButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.getByText(messageText)).toBeVisible();
    });
  }
}
