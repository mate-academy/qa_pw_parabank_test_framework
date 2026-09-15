import { expect, testStep } from '../../common/helpers/pwHelpers';

export class RegisterPage {
  constructor(page, userId = 0) {
    this.page = page;

    this.userId = userId;

    this.firstNameField = page.locator('[id="customer.firstName"]');
    this.lastNameField = page.locator('[id="customer.lastName"]');
    this.addressField = page.locator('[id="customer.address.street"]');
    this.cityField = page.locator('[id="customer.address.city"]');
    this.stateField = page.locator('[id="customer.address.state"]');
    this.zipCodeField = page.locator('[id="customer.address.zipCode"]');
    this.phoneField = page.locator('[id="customer.phoneNumber"]');
    this.ssnField = page.locator('[id="customer.ssn"]');
    this.usernameField = page.locator('[id="customer.username"]');
    this.passwordField = page.locator('[id="customer.password"]');
    this.confirmPasswordField = page.locator('[id="repeatedPassword"]');

    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
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
      await this.confirmPasswordField.fill(user.password);
    });
  }

  async verifyRegistrationSuccessful(username) {
    await this.step('Verify successful registration', async () => {
      await expect(
        this.page.getByRole('heading', { name: `Welcome ${username}` }),
      ).toBeVisible();
    });
  }

  async submitRegistration() {
    await this.step('Submit registration form', async () => {
      await this.registerButton.click();
    });
  }

  async clearField(field) {
    await this.step(`Clear ${field} field`, async () => {
      await this[field].fill('');
    });
  }

  async verifyErrorMessage(message) {
    await this.step('Verify validation error message', async () => {
      await expect(this.page.getByText(message)).toBeVisible();
    });
  }

  async fillConfirmPassword(password) {
    await this.step('Fill different confirm password', async () => {
      await this.confirmPasswordField.fill(password);
    });
  }

  async clickLogout() {
    await this.step('Click Log Out link', async () => {
      await this.logoutLink.click();
    });
  }

  async fillUsername(username) {
    await this.step('Fill username', async () => {
      await this.usernameField.fill(username);
    });
  }
}
