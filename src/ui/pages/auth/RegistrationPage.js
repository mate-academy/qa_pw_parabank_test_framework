import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class RegistrationPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.firstNameInput = page.locator('input[name="customer.firstName"]');
    this.lastNameInput = page.locator('input[name="customer.lastName"]');
    this.addressInput = page.locator('input[name="customer.address.street"]');
    this.cityInput = page.locator('input[name="customer.address.city"]');
    this.stateInput = page.locator('input[name="customer.address.state"]');
    this.zipCodeInput = page.locator('input[name="customer.address.zipCode"]');
    this.phoneNumberInput = page.locator('input[name="customer.phoneNumber"]');
    this.ssnInput = page.locator('input[name="customer.ssn"]');
    this.usernameInput = page.locator('input[name="customer.username"]');
    this.passwordInput = page.locator('input[name="customer.password"]');
    this.confirmPasswordInput = page.locator('input[name="repeatedPassword"]');
    this.registerButton = page.getByRole('button', {
      name: 'Register',
    });
    this.welcomeHeading = page.locator('#rightPanel h1');
    this.successMessage = page.getByText(
      'Your account was created successfully. You are now logged in.',
    );
    this.passwordConfirmationError = page.locator(
      '[id="repeatedPassword.errors"]',
    );
  }

  async open() {
    await this.step('Open the registration page', async () => {
      await this.openPage('register.htm', this.firstNameInput);
    });
  }

  async fillRegistrationForm(registrationData) {
    await this.step('Fill in the registration form', async () => {
      await this.firstNameInput.fill(registrationData.firstName);
      await this.lastNameInput.fill(registrationData.lastName);
      await this.addressInput.fill(registrationData.address);
      await this.cityInput.fill(registrationData.city);
      await this.stateInput.fill(registrationData.state);
      await this.zipCodeInput.fill(registrationData.zipCode);
      await this.phoneNumberInput.fill(registrationData.phoneNumber);
      await this.ssnInput.fill(registrationData.ssn);
      await this.usernameInput.fill(registrationData.username);
      await this.passwordInput.fill(registrationData.password);
      await this.confirmPasswordInput.fill(registrationData.confirmPassword);
    });
  }

  async submitRegistration() {
    await this.step('Submit the registration form', async () => {
      await this.registerButton.click();
    });
  }

  async assertRegistrationIsSuccessful(username) {
    await this.step('Verify successful registration', async () => {
      await expect(this.welcomeHeading).toHaveText(`Welcome ${username}`);
      await expect(this.successMessage).toBeVisible();
    });
  }

  async assertPasswordMismatchErrorIsVisible() {
    await this.step('Verify the password confirmation error', async () => {
      await expect(this.passwordConfirmationError).toHaveText(
        'Passwords did not match.',
      );
    });
  }
}
