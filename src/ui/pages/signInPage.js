import { expect, testStep } from '../../common/helpers/pwHelpers';

export class SignInPage{
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameField = page.locator('[name="username"]');
    this.passwordField = page.locator('[name="password"]');
    this.logInButton = page.getByRole('button', {name: 'Log In'});
    this.errorMessage = page.locator('#rightPanel p');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign In' page`, async () => {
      await this.page.goto('index.htm');
    });
  }

  async fillUsernameField(username) {
    await this.step(`fill username field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`fill password field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLogInButton() {
    await this.step(`Click log in button`, async () => {
      await this.logInButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}


