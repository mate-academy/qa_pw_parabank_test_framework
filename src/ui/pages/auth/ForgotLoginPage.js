import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class ForgotLoginPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.firstNameField = page.locator('input[id="firstName"]');
    this.lastNameField = page.locator('input[id="lastName"]');
    this.addressField = page.locator('input[id="address.street"]');
    this.cityField = page.locator('input[id="address.city"]');
    this.stateField = page.locator('input[id="address.state"]');
    this.zipCodeField = page.locator('input[id="address.zipCode"]');
    this.ssnField = page.locator('input[id="ssn"]');

    this.findLoginInfoButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });

    this.resultPanel = page.locator('#rightPanel');
    this.errorMessages = page.locator('#rightPanel .error');
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async open() {
    await this.step('Open Forgot Login Info page', async () => {
      await this.page.goto('/parabank/lookup.htm');
    });
  }

  async fillRecoveryForm(user) {
    await this.step('Fill login recovery form', async () => {
      await this.firstNameField.fill(user.firstName);
      await this.lastNameField.fill(user.lastName);
      await this.addressField.fill(user.address);
      await this.cityField.fill(user.city);
      await this.stateField.fill(user.state);
      await this.zipCodeField.fill(user.zipCode);
      await this.ssnField.fill(user.ssn);
    });
  }

  async clickFindLoginInfoButton() {
    await this.step('Click Find My Login Info button', async () => {
      await this.findLoginInfoButton.click();
    });
  }

  async assertRecoverySuccessful(username) {
    await this.step('Assert login information was recovered', async () => {
      await expect(this.resultPanel).toContainText(
        'Your login information was located successfully',
      );

      await expect(this.resultPanel).toContainText(username);
    });
  }

  async assertErrorMessageContainsText(message) {
    await this.step(`Assert recovery error: ${message}`, async () => {
      await expect(
        this.errorMessages.filter({ hasText: message }).first(),
      ).toBeVisible();
    });
  }
}
