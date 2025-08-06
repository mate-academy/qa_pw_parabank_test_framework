import { testStep } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    // Fields
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });

    // Buttons
    this.forgotLogInLink = page
      .getByRole('paragraph')
      .filter({ hasText: 'Forgot login info?' });
    this.registrationLink = page.getByRole('link', { name: 'Register' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('parabank/index.htm');
    });
  }

  async fillUsernameField(username) {
    await this.step(`Fill the 'username' field`, async () => {
      await this.usernameField.waitFor();
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLogInButton() {
    await this.step(`Click the 'Log In' button`, async () => {
      await this.logInButton.click();
    });
  }

  async submitLogInForm(user) {
    await this.step(`Fill the 'Log In' form`, async () => {
      await this.fillUsernameField(user.username);
      await this.fillPasswordField(user.password);
      await this.clickLogInButton();
    });
  }

  async clickForgotLogInLink() {
    await this.step(`Click the 'Forgot login info' button`, async () => {
      await this.forgotLogInLink.click();
    });
  }
}
