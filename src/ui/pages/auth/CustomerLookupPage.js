import { testStep, expect } from '../../../common/helpers/pwHelpers';

export class CustomerLookupPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.customerLookup = page.getByRole('heading', {
      name: 'Customer Lookup',
    });
    this.firstNameField = page.locator('#firstName');
    this.lastNameField = page.locator('#lastName');
    this.addressField = page.locator('[id="address\\.street"]');
    this.cityField = page.locator('[id="address\\.city"]');
    this.stateField = page.locator('[id="address\\.state"]');
    this.zipCodeField = page.locator('[id="address\\.zipCode"]');
    this.ssnField = page.locator('#ssn');
    this.searchButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });
    this.succsessSearchMessage = page.getByText('Your login information was');
    this.linkLogOut = page.getByRole('link', { name: 'Log Out' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Customer Lookup' page`, async () => {
      await this.page.goto(
        'https://parabank.parasoft.com/parabank/lookup.htm;jsessionid=77D0A59A9840D0FF99A1569B296C0F35',
      );
    });
  }

  async assertcCustomerLookupIsVisible() {
    await this.step(
      'Checking the visibility of "Customer Lookup"',
      async () => {
        await expect(this.customerLookup).toBeVisible();
      },
    );
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

  async fillSsnField(ssn) {
    await this.step('Fill the "SSN" field', async () => {
      await this.ssnField.fill(ssn);
    });
  }

  async clickSearchButton() {
    await this.step('Click the "Find My Login Info" button', async () => {
      await this.searchButton.click();
    });
  }

  async assertSuccessSearchMessageIsVisible() {
    await this.step(
      'Checking the visibility of success search message',
      async () => {
        await expect(this.succsessSearchMessage).toBeVisible();
      },
    );
  }

  async assertUsernameIsVisible(username) {
    await this.step(
      `Checking the visibility of username: ${username}`,
      async () => {
        const usernameLocator = this.page.getByText(`Username: ${username}`);
        await expect(usernameLocator).toBeVisible();
      },
    );
  }

  async assertPasswordIsVisible(password) {
    await this.step('Checking the visibility of password', async () => {
      const passwordLocator = this.page.getByText(`Password: ${password}`);
      await expect(passwordLocator).toBeVisible();
    });
  }

  async assertUserIsLoggedIn() {
    await this.step(
      'Checking that user is logged in (Log Out link is visible)',
      async () => {
        await expect(this.linkLogOut).toBeVisible();
      },
    );
  }
}
