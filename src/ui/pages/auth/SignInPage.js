import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class SignInPage{
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });
    this.accountsOverview = page.getByRole('heading', { name: 'Accounts Overview' });
  
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
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clicklogInButton() {
    await this.step(`Click the 'Log in' button`, async () => {
      await this.logInButton.click();
    });
  }

  

  async assertAccountsOverviewIsVisible() {
    await this.step(`Assert the 'Accounts Overview' is visible`, async () => {
      await expect(this.accountsOverview).toBeVisible();
    });
  }

  errorMessage(message) {
    return this.page.locator('#rightPanel').getByText(message);
  }

  async assertErrorMessageIsVisible(message) {
    await this.step(`Assert the "${message}" is visible`, async () => {
      await expect(this.errorMessage(message)).toBeVisible();
    });
  }
}