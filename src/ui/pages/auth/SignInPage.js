import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });
    this.errorMessage = page.locator('p.error');
    this.loginPanel = page.locator('#loginPanel');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Navigate to 'Sign In' page`, async () => {
      await this.page.goto('index.htm');
    });
  }

  async fillUsernameField(username) {
    await this.step(`Fill 'Username' field with '${username}'`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLogInButton() {
    await this.step(`Click 'Log in' button`, async () => {
      await this.logInButton.click();
    });
  }

  async assertErrorMessage(messageText) {
    await this.step(`Assert the ${messageText} is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertLoginFormIsVisible() {
    await this.step(`Assert the login form is visible`, async () => {
      await expect(this.loginPanel).toBeVisible();
    });
  }
}
