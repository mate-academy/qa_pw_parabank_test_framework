import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class RegisterPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.firstNameField = page.locator('input[id="customer.firstName"]');
    this.lastNameField = page.locator('input[id="customer.lastName"]');
    this.addressField = page.locator('input[id="customer.address.street"]');
    this.cityField = page.locator('input[id="customer.address.city"]');
    this.stateField = page.locator('input[id="customer.address.state"]');
    this.zipCodeField = page.locator('input[id="customer.address.zipCode"]');
    this.phoneField = page.locator('input[id="customer.phoneNumber"]');
    this.ssnField = page.locator('input[id="customer.ssn"]');
    this.usernameField = page.locator('input[id="customer.username"]');
    this.passwordField = page.locator('input[id="customer.password"]');
    this.confirmPasswordField = page.locator('input[id="repeatedPassword"]');

    this.registerButton = page.getByRole('button', {
      name: 'Register',
    });

    this.successHeading = page.getByRole('heading', {
      name: /^Welcome /,
    });

    this.successMessage = page.locator('#rightPanel');
    this.errorMessages = page.locator('#rightPanel .error:visible');
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async open() {
    await this.step('Open registration page', async () => {
      await this.page.goto('/parabank/register.htm');

      await expect(this.firstNameField).toBeVisible({
        timeout: 15000,
      });

      await expect(this.registerButton).toBeVisible();
    });
  }

  async fillRegistrationForm(user) {
    await this.step('Fill registration form', async () => {
      await this.firstNameField.fill(user.firstName);
      await this.lastNameField.fill(user.lastName);
      await this.addressField.fill(user.address);
      await this.cityField.fill(user.city);
      await this.stateField.fill(user.state);
      await this.zipCodeField.fill(user.zipCode);
      await this.phoneField.fill(user.phone);
      await this.ssnField.fill(user.ssn);
      await this.usernameField.fill(user.username);
      await this.passwordField.fill(user.password);
      await this.confirmPasswordField.fill(user.confirmPassword);

      await expect(this.usernameField).toHaveValue(user.username);
      await expect(this.passwordField).toHaveValue(user.password);
      await expect(this.confirmPasswordField).toHaveValue(user.confirmPassword);
    });
  }

  async clickRegisterButton() {
    await this.step('Click Register button', async () => {
      await expect(this.registerButton).toBeEnabled();

      await this.registerButton.click();
    });
  }

  async assertRegistrationSuccessful(username) {
    await this.step('Assert registration was successful', async () => {
      await expect(this.successHeading).toHaveText(`Welcome ${username}`, {
        timeout: 15000,
      });

      await expect(this.successMessage).toContainText(
        'Your account was created successfully',
      );

      await expect(this.errorMessages).toHaveCount(0);
    });
  }

  async assertErrorMessageContainsText(message) {
    await this.step(`Assert registration error: ${message}`, async () => {
      await expect(
        this.errorMessages.filter({ hasText: message }).first(),
      ).toBeVisible({
        timeout: 15000,
      });
    });
  }
}
