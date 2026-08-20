import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });
    this.errorMessage = page.locator('#rightPanel .error');
  }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
  async open() {
    await this.step(`Open 'Sign In' page`, async () => {
      await this.page.goto('/parabank/index.htm');
    });
  }

  async fillUsernameField(value) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(value);
    });
  }

  async fillPasswordField(value) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(value);
    });
  }

  async clickLogInButton() {
    await this.step(`Click the 'Log in' button`, async () => {
      await this.logInButton.click();
    });
  }

  async assertErrorMessageHasText(text) {
    await this.step(`Assert the error message is '${text}'`, async () => {
      await expect(this.errorMessage).toHaveText(text);
    });
  }

  async assertLoginFormIsVisible() {
    await this.step(`Assert the 'Sign In' login form is visible`, async () => {
      await expect(this.usernameField).toBeVisible();
      await expect(this.passwordField).toBeVisible();
      await expect(this.logInButton).toBeVisible();
    });
  }
}
