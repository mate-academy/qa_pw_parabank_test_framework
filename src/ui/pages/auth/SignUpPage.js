import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class SignUpPage {
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
    this.confirmPasswordField = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.firstNameErrorMessage = page.locator(
      '[id="customer.firstName.errors"]',
    );
    this.lastNameErrorMessage = page.locator('[id="customer.lastName.errors"]');
    this.addressErrorMessage = page.locator(
      '[id="customer.address.street.errors"]',
    );
    this.cityErrorMessage = page.locator('[id="customer.address.city.errors"]');
    this.stateErrorMessage = page.locator(
      '[id="customer.address.state.errors"]',
    );
    this.zipCodeErrorMessage = page.locator(
      '[id="customer.address.zipCode.errors"]',
    );
    this.ssnErrorMessage = page.locator('[id="customer.ssn.errors"]');
    this.usernameErrorMessage = page.locator('[id="customer.username.errors"]');
    this.passwordErrorMessage = page.locator('[id="customer.password.errors"]');
    this.confirmPasswordErrorMessage = page.locator(
      '[id="repeatedPassword.errors"]',
    );
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Navigate to 'Sign Up' page`, async () => {
      await this.page.goto('register.htm');
    });
  }

  async fillForm(userData, confirmPassword = userData.password) {
    await this.step(`Fill form fields`, async () => {
      await this.firstNameField.fill(userData.firstName);
      await this.lastNameField.fill(userData.lastName);
      await this.addressField.fill(userData.address);
      await this.cityField.fill(userData.city);
      await this.stateField.fill(userData.state);
      await this.zipCodeField.fill(userData.zipCode);
      await this.phoneField.fill(userData.phone);
      await this.ssnField.fill(userData.ssn);
      await this.usernameField.fill(userData.username);
      await this.passwordField.fill(userData.password);
      await this.confirmPasswordField.fill(confirmPassword);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click 'Register' button`, async () => {
      await this.registerButton.click();
    });
  }

  async assertErrorMessage(errorFieldLocator, messageText) {
    await this.step(`Assert the ${messageText} error is shown`, async () => {
      await expect(errorFieldLocator).toContainText(messageText);
    });
  }

  async assertSuccessMessageContainsText(messageText) {
    await this.step(
      `Assert success registration message is shown`,
      async () => {
        await expect(this.page.locator('#rightPanel')).toContainText(
          messageText,
        );
      },
    );
  }
}
