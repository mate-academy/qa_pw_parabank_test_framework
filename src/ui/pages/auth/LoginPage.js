import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

const INVALID_CREDENTIALS_ERRORS = [
  'The username and password could not be verified.',
  'An internal error has occurred and has been logged.',
];

export class LoginPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.customerLoginHeading = page.getByRole('heading', {
      name: 'Customer Login',
    });
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.loginError = page.locator('#rightPanel .error');
    this.forgotLoginInfoLink = page.getByRole('link', {
      name: 'Forgot login info?',
    });
  }

  async open() {
    await this.step('Open the Parabank home page', async () => {
      await this.openPage('index.htm', this.customerLoginHeading);
    });
  }

  async openForgotLoginInfoPage() {
    await this.step('Open the forgot login information page', async () => {
      await this.forgotLoginInfoLink.click();
    });
  }

  async fillCredentials(username, password) {
    await this.step('Fill in the login credentials', async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
    });
  }

  async submitLogin() {
    await this.step('Submit the login form', async () => {
      await this.loginButton.click();
    });
  }

  async assertLoginFormIsVisible() {
    await this.step(
      'Verify that the customer login form is visible',
      async () => {
        await expect(this.customerLoginHeading).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
      },
    );
  }

  async assertInvalidCredentialsErrorIsVisible() {
    await this.step('Verify the invalid credentials error', async () => {
      const loginErrorText = (await this.loginError.innerText()).trim();

      expect(INVALID_CREDENTIALS_ERRORS).toContain(loginErrorText);
      await expect(this.loginButton).toBeVisible();
    });
  }
}
