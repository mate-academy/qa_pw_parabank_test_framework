import { expect, testStep } from '../../common/helpers/pwHelpers';

export class ForgotLoginInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.customerLookupTitle = page.getByRole('heading', {
      name: 'Customer Lookup',
    });

    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.addressInput = page.locator('[id="address.street"]');
    this.cityInput = page.locator('[id="address.city"]');
    this.stateInput = page.locator('[id="address.state"]');
    this.zipCodeInput = page.locator('[id="address.zipCode"]');
    this.ssnInput = page.locator('#ssn');

    this.findMyLoginInfoButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });

    this.successMessage = page.getByText(
      'Your login information was located successfully. You are now logged in.',
    );

    this.loginInformation = page.locator('#rightPanel');

    this.firstNameError = page.locator('[id="firstName.errors"]');
    this.lastNameError = page.locator('[id="lastName.errors"]');
    this.addressError = page.locator('[id="address.street.errors"]');
    this.cityError = page.locator('[id="address.city.errors"]');
    this.stateError = page.locator('[id="address.state.errors"]');
    this.zipCodeError = page.locator('[id="address.zipCode.errors"]');
    this.ssnError = page.locator('[id="ssn.errors"]');

    this.errorMessage = page.locator('.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertCustomerLookupTitleIsVisible() {
    await this.step(`Assert 'Customer Lookup' title is visible`, async () => {
      await expect(this.customerLookupTitle).toBeVisible();
    });
  }

  async fillFirstNameInput(firstName) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameInput.fill(firstName);
    });
  }

  async fillLastNameInput(lastName) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameInput.fill(lastName);
    });
  }

  async fillAddressInput(address) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.addressInput.fill(address);
    });
  }

  async fillCityInput(city) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityInput.fill(city);
    });
  }

  async fillStateInput(state) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateInput.fill(state);
    });
  }

  async fillZipCodeInput(zipCode) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeInput.fill(zipCode);
    });
  }

  async fillSsnInput(ssn) {
    await this.step(`Fill the 'SSN' field`, async () => {
      await this.ssnInput.fill(ssn);
    });
  }

  async clickFindMyLoginInfoButton() {
    await this.step(`Click 'Find My Login Info' button`, async () => {
      await this.findMyLoginInfoButton.click();
    });
  }

  async assertSuccessMessageIsVisible() {
    await this.step(
      `Assert login information was located successfully`,
      async () => {
        await expect(this.successMessage).toBeVisible();
      },
    );
  }

  async assertLoginInformationIsCorrect(username, password) {
    await this.step(
      `Assert recovered login information is correct`,
      async () => {
        await expect(this.loginInformation).toContainText(
          `Username: ${username}`,
        );
        await expect(this.loginInformation).toContainText(
          `Password: ${password}`,
        );
      },
    );
  }

  async assertFirstNameErrorContainsText(message) {
    await this.step(`Assert first name error`, async () => {
      await expect(this.firstNameError).toContainText(message);
    });
  }

  async assertLastNameErrorContainsText(message) {
    await this.step(`Assert last name error`, async () => {
      await expect(this.lastNameError).toContainText(message);
    });
  }

  async assertAddressErrorContainsText(message) {
    await this.step(`Assert address error`, async () => {
      await expect(this.addressError).toContainText(message);
    });
  }

  async assertCityErrorContainsText(message) {
    await this.step(`Assert city error`, async () => {
      await expect(this.cityError).toContainText(message);
    });
  }

  async assertStateErrorContainsText(message) {
    await this.step(`Assert state error`, async () => {
      await expect(this.stateError).toContainText(message);
    });
  }

  async assertZipCodeErrorContainsText(message) {
    await this.step(`Assert zip code error`, async () => {
      await expect(this.zipCodeError).toContainText(message);
    });
  }

  async assertSsnErrorContainsText(message) {
    await this.step(`Assert SSN error`, async () => {
      await expect(this.ssnError).toContainText(message);
    });
  }

  async assertErrorMessageContainsText(message) {
    await this.step(`Assert error message`, async () => {
      await expect(this.errorMessage).toContainText(message);
    });
  }
}
