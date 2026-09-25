import { testStep, expect } from '../../../common/helpers/pwHelpers';

export class SignUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[id="customer\\.firstName"]');
    this.lastNameField = page.locator('[id="customer\\.lastName"]');
    this.addressField = page.locator('[id="customer\\.address\\.street"]');
    this.cityField = page.locator('[id="customer\\.address\\.city"]');
    this.stateField = page.locator('[id="customer\\.address\\.state"]');
    this.zipCodeField = page.locator('[id="customer\\.address\\.zipCode"]');
    this.phoneField = page.locator('[id="customer\\.phoneNumber"]');
    this.ssnField = page.locator('[id="customer\\.ssn"]');
    this.usernameField = page.locator('[id="customer\\.username"]');
    this.passwordField = page.locator('[id="customer\\.password"]');
    this.confirmField = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.logOutLink = page.getByRole('link', { name: 'Log Out' });
    this.accountsOverviewLink = page.getByRole('link', {
      name: 'Accounts Overview',
    });
    this.openNewAccountLink = page.getByRole('link', {
      name: 'Open New Account',
    });
    this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
    this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
    this.updateContactInfoLink = page.getByRole('link', {
      name: 'Update Contact Info',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto(
        'https://parabank.parasoft.com/parabank/register.htm',
      );
    });
  }

  async fillFirstNameField(name) {
    await this.step('Fill the "First Name" field', async () => {
      await this.firstNameField.fill(name);
    });
  }

  async fillLastNameField(lastname) {
    await this.step('Fill the "Last Name" field', async () => {
      await this.lastNameField.fill(lastname);
    });
  }

  async fillAddressField(address) {
    await this.step('Fill the "Address" field', async () => {
      await this.addressField.fill(address);
    });
  }

  async fillCityField(city) {
    await this.step('Fill the "City" field', async () => {
      await this.cityField.fill(city);
    });
  }

  async fillStateField(state) {
    await this.step('Fill the "State" field', async () => {
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zipCode) {
    await this.step('Fill the "Zip Code" field', async () => {
      await this.zipCodeField.fill(zipCode);
    });
  }

  async fillPhoneField(phone) {
    await this.step('Fill the "Phone" field', async () => {
      await this.phoneField.fill(phone);
    });
  }

  async fillSsnField(ssn) {
    await this.step('Fill the "SSN" field', async () => {
      await this.ssnField.fill(ssn);
    });
  }

  async fillUsernameField(username) {
    await this.step('Fill the "Username" field', async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step('Fill the "Password" field', async () => {
      await this.passwordField.fill(password);
    });
  }

  async fillConfirmField(confirmPassword) {
    await this.step('Fill the "Confirm Password" field', async () => {
      await this.confirmField.fill(confirmPassword);
    });
  }

  async clickRegisterButton() {
    await this.step('Click the “Register” button', async () => {
      await this.registerButton.click();
    });
  }

  async verifySuccessRegistration(username) {
    await this.step(
      'Verify success registration message is visible',
      async () => {
        const welcomeHeader = this.page.locator(
          `h1.title:has-text("Welcome ${username}")`,
        );
        const successMessage = this.page.locator(
          'text=Your account was created successfully.',
        );

        await expect(welcomeHeader).toBeVisible();
        await expect(successMessage).toBeVisible();
      },
    );
  }

  async submitSignUpForm(user) {
    await this.fillFirstNameField(user.firstName);
    await this.fillLastNameField(user.lastName);
    await this.fillAddressField(user.address);
    await this.fillCityField(user.city);
    await this.fillStateField(user.state);
    await this.fillZipCodeField(user.zipCode);
    await this.fillPhoneField(user.phone);
    await this.fillSsnField(user.ssn);
    await this.fillUsernameField(user.username);
    await this.fillPasswordField(user.password);
    await this.fillConfirmField(user.password);
  }

  async registerUser(user) {
    await this.submitSignUpForm(user);
    await this.clickRegisterButton();
  }

  async verifyFieldError(fieldKey, expectedErrorText) {
    await this.step(
      `Verify error message for field '${fieldKey}'`,
      async () => {
        const elementId =
          fieldKey === 'repeatedPassword'
            ? `${fieldKey}.errors`
            : `customer.${fieldKey}.errors`;

        const errorLocator = this.page.locator(`[id="${elementId}"]`);
        await expect(errorLocator).toHaveText(expectedErrorText);
      },
    );
  }

  async clickLogOut() {
    await this.step('Click the "Log Out" link', async () => {
      await this.logOutLink.click();
    });
  }
  async clickAccountsOverviewLink() {
    await this.step('Click the "Accounts Overview" link', async () => {
      await this.accountsOverviewLink.click();
    });
  }

  async clickOpenNewAccountLink() {
    await this.step('Click the "Open New Account" link', async () => {
      await this.openNewAccountLink.click();
    });
  }

  async clickTransferFundsLink() {
    await this.step('Click the "Transfer Funds" link', async () => {
      await this.transferFundsLink.click();
    });
  }

  async clickbillPayLink() {
    await this.step('Click the "Bill Pay" link', async () => {
      await this.billPayLink.click();
    });
  }

  async clickUpdateContactInfoLink() {
    await this.step('Click the "Update Contact Info" link', async () => {
      await this.updateContactInfoLink.click();
    });
  }
}
