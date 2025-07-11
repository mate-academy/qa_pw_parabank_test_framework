import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class SignInPage {
  constructor(page) {
    this.page = page;
    this.userNameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginBtn = page.getByRole('button', { name: 'Log In' });
    this.errorMessageBlock = page.getByText('Please enter a username and');
    this.errorTitle = page.getByRole('heading', { name: 'Error!' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  async open() {
    await this.step(`Open 'Main' page`, async () => {
      await this.page.goto('index.htm');
    });
  }

  async fillUserNameField(userName) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.userNameField.fill(userName);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }
  async clickLoginBtn() {
    await this.step(`Click login button`, async () => {
      await this.loginBtn.click();
    });
  }

  async errorTitleIsDisplayed(errorTitle) {
    await this.step(`Error title is displayed`, async () => {
      await expect(this.errorTitle).toHaveText(errorTitle);
    });
  }

  async errorMessageIsDisplayed(errorMessage) {
    await this.step(`Error message is displayed`, async () => {
      await expect(this.errorMessageBlock).toHaveText(errorMessage);
    });
  }
}
