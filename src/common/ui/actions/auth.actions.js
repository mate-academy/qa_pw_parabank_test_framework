// src/common/ui/actions/auth.actions.js
import { testStep } from '../../helpers/pwHelpers';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';

export class AuthActions {
  constructor(page, logger, userId = 0) {
    this.page = page;
    this.logger = logger;
    this.userId = userId;
    this.loginPage = new LoginPage(page, userId);
    this.registerPage = new RegisterPage(page, userId);
  }

  async login(username, password) {
    await testStep('Login user', async () => {
      await this.loginPage.open();
      await this.loginPage.fillCredentials(username, password); // fixed
      await this.loginPage.submit();
    }, this.userId);
  }

  async loginNegative(username, password) {
    await testStep('Login negative test', async () => {
      await this.loginPage.open();
      await this.loginPage.fillCredentials(username, password);
      await this.loginPage.submit();
      await this.loginPage.verifyLoginError(); // fixed
    }, this.userId);
  }

  async registerUser(userData) {
    return this.register(userData); // alias for tests
  }

  async register(userData) {
    await testStep('Register user', async () => {
      await this.registerPage.open();
      await this.registerPage.fillRegistrationForm(userData);
      await this.registerPage.submit();
    }, this.userId);
  }

  async forgotLogin(firstName, lastName, ssn) {
    await testStep('Recover login info', async () => {
      await this.loginPage.open();
      await this.loginPage.openForgotLogin();
      await this.loginPage.fillForgotLoginForm(firstName, lastName, ssn);
      await this.loginPage.submitForgotLogin();
    }, this.userId);
  }
}
