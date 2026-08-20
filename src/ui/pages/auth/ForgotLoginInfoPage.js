import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class ForgotLoginInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.firstNameField = page.locator('input[name="firstName"]');
    this.lastNameField = page.locator('input[name="lastName"]');
    this.streetField = page.locator('input[name="address.street"]');
    this.cityField = page.locator('input[name="address.city"]');
    this.stateField = page.locator('input[name="address.state"]');
    this.zipCodeField = page.locator('input[name="address.zipCode"]');
    this.ssnField = page.locator('input[name="ssn"]');
    this.findLoginInfoButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });

    this.pageTitle = page.locator('#rightPanel h1.title');
    this.successMessage = page.getByText(
      'Your login information was located successfully. You are now logged in.',
    );
    this.credentialsResult = page.locator('#rightPanel p').last();
    this.errorMessage = page.locator('#rightPanel p.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Forgot Login Info' page`, async () => {
      await this.page.goto('/parabank/lookup.htm');
    });
  }

  async fillFirstNameField(value) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameField.fill(value);
    });
  }

  async fillLastNameField(value) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameField.fill(value);
    });
  }

  async fillStreetField(value) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.streetField.fill(value);
    });
  }

  async fillCityField(value) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityField.fill(value);
    });
  }

  async fillStateField(value) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateField.fill(value);
    });
  }

  async fillZipCodeField(value) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeField.fill(value);
    });
  }

  async fillSsnField(value) {
    await this.step(`Fill the 'SSN' field`, async () => {
      await this.ssnField.fill(value);
    });
  }

  async clickFindLoginInfoButton() {
    await this.step(`Click the 'Find My Login Info' button`, async () => {
      await this.findLoginInfoButton.click();
    });
  }

  async submitLookupForm(customer) {
    if (customer.firstName != null)
      await this.fillFirstNameField(customer.firstName);
    if (customer.lastName != null)
      await this.fillLastNameField(customer.lastName);
    if (customer.street != null) await this.fillStreetField(customer.street);
    if (customer.city != null) await this.fillCityField(customer.city);
    if (customer.state != null) await this.fillStateField(customer.state);
    if (customer.zipCode != null) await this.fillZipCodeField(customer.zipCode);
    if (customer.ssn != null) await this.fillSsnField(customer.ssn);
    await this.clickFindLoginInfoButton();
  }

  async assertSuccessResult() {
    await this.step(`Assert 'Forgot Login Info' success result`, async () => {
      await expect(this.successMessage).toBeVisible();
      await expect(this.credentialsResult).toContainText('Username');
      await expect(this.credentialsResult).toContainText('Password');
    });
  }

  async assertErrorMessage(
    message = 'The customer information provided could not be found.',
  ) {
    await this.step(`Assert 'Forgot Login Info' error message`, async () => {
      await expect(this.pageTitle).toHaveText('Error!');
      await expect(this.errorMessage).toHaveText(message);
    });
  }
}
