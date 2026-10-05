import { expect, testStep } from '../../common/helpers/pwHelpers';

export class CustomerLookupPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[name="firstName"]');
    this.lastNameField = page.locator('[name="lastName"]');
    this.addressField = page.locator('[name="address.street"]');
    this.cityField = page.locator('[name="address.city"]');
    this.stateField = page.locator('[name="address.state"]');
    this.zipCodeField = page.locator('[name="address.zipCode"]');
    this.phoneField = page.locator('[name="phoneNumber"]');
    this.ssnField = page.locator('[name="ssn"]');
    this.findCustomerButton = page.getByRole('button', { name: 'Find My Login Info' });
    this.lookupResultText = this.page.locator('#rightPanel p').filter({ hasText: 'Username' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open "Forgot login info" page`, async () => {
      await this.page.goto('/parabank/lookup.htm');
    });
  }

  async fillForm(userData) {
    await this.step('Fill customer look up form', async () => {
      await this.firstNameField.fill(userData.firstName);
      await this.lastNameField.fill(userData.lastName);
      await this.addressField.fill(userData.address);
      await this.cityField.fill(userData.city);
      await this.stateField.fill(userData.state);
      await this.zipCodeField.fill(userData.zipCode);
      await this.ssnField.fill(userData.ssn);
    });
  }

  async clickFindMyLoginButton() {
    await this.step('Click "Find My Login Info" button', async () => {
      await this.findCustomerButton.click();
    });
  }

  async assertErrorMessageIsShown(errorMessage) {
  await this.step(`Assert error message is shown`, async () => {
    await expect(this.page.getByText(errorMessage)).toBeVisible();
  });
}

  async assertCustomerIsFound(username, password) {
    await this.step(`Assert customer is found`, async () => {
      await expect(this.page.getByText('Your login information was located successfully.')).toBeVisible();
      await expect(this.lookupResultText).toContainText(`Username: ${username}`);
      await expect(this.lookupResultText).toContainText(`Password: ${password}`);
    });
  }
}