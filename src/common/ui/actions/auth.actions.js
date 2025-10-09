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
      await this.loginPage.fillLoginForm(username, password);
      await this.loginPage.submit();
    }, this.userId);
  }

  async register(userData) {
    await testStep('Register new user', async () => {
      await this.registerPage.open();
      await this.registerPage.fillRegistrationForm(userData);
      await this.registerPage.submit();
    }, this.userId);
  }

  async forgotLogin(firstName, lastName, ssn) {
    await testStep('Recover login info', async () => {
      await this.loginPage.open();              // FIX: open login page first
      await this.loginPage.openForgotLogin();
      await this.loginPage.fillForgotLoginForm(firstName, lastName, ssn);
      await this.loginPage.submitForgotLogin();
    }, this.userId);
  }

  async assertLoginFailed() {
    await testStep('Assert login failed', async () => {
      await this.loginPage.assertLoginError();
    }, this.userId);
  }

  async assertRegistrationFailed() {
    await testStep('Assert registration failed', async () => {
      await this.registerPage.assertRegistrationError();
    }, this.userId);
  }
}
