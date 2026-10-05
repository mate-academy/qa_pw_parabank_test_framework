import { expect, testStep } from '../../common/helpers/pwHelpers';

export class RegistrationPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[name="customer.firstName"]');
    this.lastNameField = page.locator('[name="customer.lastName"]');
    this.addressField = page.locator('[name="customer.address.street"]');
    this.cityField = page.locator('[name="customer.address.city"]');
    this.stateField = page.locator('[name="customer.address.state"]');
    this.zipCodeField = page.locator('[name="customer.address.zipCode"]');
    this.phoneField = page.locator('[name="customer.phoneNumber"]');
    this.ssnField = page.locator('[name="customer.ssn"]');
    this.usernameField = page.locator('[name="customer.username"]');
    this.passwordField = page.locator('[name="customer.password"]');
    this.repeatedPasswordField = page.locator('[name="repeatedPassword"]');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.welcomeMessage = (username) => this.page.getByRole('heading', { name: `Welcome ${username}` });
  
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Registration' page`, async () => {
      await this.page.goto('parabank/register.htm');
    });
  }

  async fillForm(userData) {
    await this.step('Fill registration form', async () => {
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
      await this.repeatedPasswordField.fill(userData.confirm);
  });
}

  async clickRegisterButton() {
    await this.step(`Click 'Register' button`, async () => {
      await this.registerButton.click();
    });
  }

  async assertWelcomeMessageIsDisplayed(username) {
    await this.step(`Assert welcome message for ${username}`, async () => {
       
      await expect(
        this.welcomeMessage(username)
      ).toHaveText(`Welcome ${username}`);
    });
  }

  async assertErrorMessageIsShown(errorMessage) {
    await this.step(`Assert "${errorMessage}" is displayed`, async () => {
      await expect(this.page.getByText(errorMessage)).toBeVisible();
    });
  }
  }