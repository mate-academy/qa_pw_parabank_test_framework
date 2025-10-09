import { BasePage } from './basePage';
import { expect } from '../../helpers/pwHelpers';

export class LoginPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'https://parabank.parasoft.com/parabank/index.htm';
    this.usernameInput = '#loginPanel input[name="username"]';
    this.passwordInput = '#loginPanel input[name="password"]';
    this.loginButton = '#loginPanel input[value="Log In"]';
    this.errorMessage = '#rightPanel .error';
    this.forgotLoginLink = 'a[href*="lookup.htm"]';
  }

  async open() {
    await super.open(this.url);
  }

  async fillCredentials(username, password) {
    await this.step(`Fill in login credentials`, async () => {
      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
    });
  }

  async submit() {
    await this.step(`Click Login`, async () => {
      await this.page.click(this.loginButton);
    });
  }

  async verifySuccessfulLogin() {
    await this.step(`Verify login success`, async () => {
      await expect(this.page.locator('a[href*="logout.htm"]')).toBeVisible();
    });
  }

  async verifyLoginError() {
    await this.step(`Verify login error displayed`, async () => {
      await expect(this.page.locator(this.errorMessage)).toContainText('The username and password could not be verified');
    });
  }

  async openForgotLogin() {
    await this.step(`Open forgot login page`, async () => {
      await this.page.click(this.forgotLoginLink);
    });
  }

  async fillForgotLoginForm(firstName, lastName, zipCode) {
    await this.step(`Fill forgot login form`, async () => {
      await this.page.fill('input[name="firstName"]', firstName);
      await this.page.fill('input[name="lastName"]', lastName);
      await this.page.fill('input[name="address.zipCode"]', zipCode);
    });
  }

  async submitForgotLogin() {
    await this.step(`Submit forgot login form`, async () => {
      await this.page.click('input[value="Find My Login Info"]');
    });
  }

  async verifyForgotLoginSuccess() {
    await this.step(`Verify login info retrieval success`, async () => {
      await expect(this.page.locator('#rightPanel')).toContainText('Customer Lookup');
    });
  }
}
