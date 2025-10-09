import { testStep } from '../../helpers/pwHelpers';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';

export class AuthActions {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.loginPage = new LoginPage(page, userId);
    this.registerPage = new RegisterPage(page, userId);
  }

  async registerUser(userData) {
    await testStep(`Register new user`, async () => {
      await this.registerPage.open();
      await this.registerPage.fillRegistrationForm(userData);
      await this.registerPage.submit();
      await this.registerPage.verifyRegistrationSuccess();
    }, this.userId);
  }

  async login(username, password) {
    await testStep(`Login with username: ${username}`, async () => {
      await this.loginPage.open();
      await this.loginPage.fillCredentials(username, password);
      await this.loginPage.submit();
      await this.loginPage.verifySuccessfulLogin();
    }, this.userId);
  }

  async loginNegative(username, password) {
    await testStep(`Attempt invalid login with username: ${username}`, async () => {
      await this.loginPage.open();
      await this.loginPage.fillCredentials(username, password);
      await this.loginPage.submit();
      await this.loginPage.verifyLoginError();
    }, this.userId);
  }

  async forgotLogin(firstName, lastName, zipCode) {
    await testStep(`Recover login info for ${firstName} ${lastName}`, async () => {
      await this.loginPage.openForgotLogin();
      await this.loginPage.fillForgotLoginForm(firstName, lastName, zipCode);
      await this.loginPage.submitForgotLogin();
      await this.loginPage.verifyForgotLoginSuccess();
    }, this.userId);
  }
}
