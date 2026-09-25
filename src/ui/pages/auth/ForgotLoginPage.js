import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class ForgotLoginPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.addressInput = page.locator('input[name="address.street"]');
    this.cityInput = page.locator('input[name="address.city"]');
    this.stateInput = page.locator('input[name="address.state"]');
    this.zipCodeInput = page.locator('input[name="address.zipCode"]');
    this.ssnInput = page.locator('input[name="ssn"]');
    this.findLoginInfoButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });
    this.rightPanel = page.locator('#rightPanel');
    this.successMessage = page.getByText(
      'Your login information was located successfully.',
    );
    this.lookupError = page.locator('#rightPanel .error');
  }

  async fillCustomerInformation(customerData) {
    await this.step('Fill in the customer information', async () => {
      await this.firstNameInput.fill(customerData.firstName);
      await this.lastNameInput.fill(customerData.lastName);
      await this.addressInput.fill(customerData.address);
      await this.cityInput.fill(customerData.city);
      await this.stateInput.fill(customerData.state);
      await this.zipCodeInput.fill(customerData.zipCode);
      await this.ssnInput.fill(customerData.ssn);
    });
  }

  async submitCustomerLookup() {
    await this.step('Submit the customer lookup form', async () => {
      await this.findLoginInfoButton.click();
    });
  }

  async assertLoginInformationIsDisplayed(customerData) {
    await this.step(
      'Verify that the login information is displayed',
      async () => {
        await expect(this.successMessage).toBeVisible();
        await expect(this.rightPanel).toContainText(
          `Username: ${customerData.username}`,
        );
        await expect(this.rightPanel).toContainText(
          `Password: ${customerData.password}`,
        );
      },
    );
  }

  async assertCustomerWasNotFound() {
    await this.step('Verify that the customer was not found', async () => {
      await expect(this.lookupError).toHaveText(
        'The customer information provided could not be found.',
      );
    });
  }
}
