import { expect, testStep } from '../../common/helpers/pwHelpers';

export class CustomerInfoForm {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    // Fields
    this.firstNameField = page.locator('#customer\\.firstName, #firstName');
    this.lastNameField = page.locator('#customer\\.lastName, #lastName');
    this.addressStreetField = page.locator(
      '#customer\\.address\\.street, #address\\.street',
    );
    this.addressCityField = page.locator(
      '#customer\\.address\\.city, #address\\.city',
    );
    this.addressStateField = page.locator(
      '#customer\\.address\\.state, #address\\.state',
    );
    this.addressZipCodeField = page.locator(
      '#customer\\.address\\.zipCode, #address\\.zipCode',
    );
    this.phoneNumberField = page.locator(
      '#customer\\.phoneNumber, #phoneNumber',
    );
    this.ssnField = page.locator('#customer\\.ssn, #ssn');
    this.usernameField = page.locator('#customer\\.username, #username');
    this.passwordField = page.locator('#customer\\.password, #password');
    this.repeatPasswordField = page.locator('#repeatedPassword');

    // Buttons
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.lookupButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });
    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });

    // Map for dynamic field access
    this.fieldMap = {
      firstName: this.firstNameField,
      lastName: this.lastNameField,
      address: this.addressStreetField,
      city: this.addressCityField,
      state: this.addressStateField,
      zipCode: this.addressZipCodeField,
      phone: this.phoneNumberField,
      ssn: this.ssnField,
      username: this.usernameField,
      password: this.passwordField,
      repeatPassword: this.repeatPasswordField,
    };
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillFirstnameField(user) {
    await this.step(`Fill 'First name' field`, async () => {
      await this.firstNameField.waitFor({ state: 'visible' });
      await this.firstNameField.fill(user.firstName);
    });
  }

  async fillLastnameField(user) {
    await this.step(`Fill 'Last name' field`, async () => {
      await this.lastNameField.fill(user.lastName);
    });
  }

  async fillAddressStreetField(user) {
    await this.step(`Fill 'Address: Street' field`, async () => {
      await this.addressStreetField.fill(user.address);
    });
  }

  async fillAddressCityField(user) {
    await this.step(`Fill 'Address: City' field`, async () => {
      await this.addressCityField.fill(user.city);
    });
  }
  async fillAddressStateField(user) {
    await this.step(`Fill 'Address: State' field`, async () => {
      await this.addressStateField.fill(user.state);
    });
  }

  async fillAddressZipCodeField(user) {
    await this.step(`Fill 'Address: Zip' field`, async () => {
      await this.addressZipCodeField.fill(user.zipCode);
    });
  }

  async fillPhoneField(user) {
    await this.step(`Fill 'Phone' field`, async () => {
      await this.phoneNumberField.fill(user.phoneNumber);
    });
  }

  async fillSsnField(user) {
    await this.step(`Fill 'SSN' field`, async () => {
      await this.ssnField.fill(user.ssn);
    });
  }

  async fillPasswordField(user) {
    await this.step(`Fill 'Password' field`, async () => {
      await this.passwordField.fill(user.password);
    });
  }

  async fillPasswordRepeatField(user) {
    await this.step(`Fill 'Repeat password' field`, async () => {
      await this.repeatPasswordField.fill(user.repeatPassword);
    });
  }

  async fillUsernameField(user) {
    await this.step(`Fill 'Username' field`, async () => {
      await this.usernameField.fill(user.username);
    });
  }

  async fillRegisterForm(user, optionalField = true) {
    await this.step('Fill registration form', async () => {
      await this.fillFirstnameField(user);
      await this.fillLastnameField(user);
      await this.fillAddressStreetField(user);
      await this.fillAddressCityField(user);
      await this.fillAddressStateField(user);
      await this.fillAddressZipCodeField(user);
      if (optionalField) await this.fillPhoneField(user);
      await this.fillSsnField(user);
      await this.fillUsernameField(user);
      await this.fillPasswordField(user);
      await this.fillPasswordRepeatField(user);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click on 'Register' button`, async () => {
      await this.registerButton.click();
    });
  }

  async submitRegisterForm(user) {
    await this.step('Submit register form', async () => {
      await this.fillRegisterForm(user);
      await this.clickRegisterButton();
    });
  }

  async fillLookupForm(user) {
    await this.step('Fill lookup form', async () => {
      await this.fillFirstnameField(user);
      await this.fillLastnameField(user);
      await this.fillAddressStreetField(user);
      await this.fillAddressCityField(user);
      await this.fillAddressStateField(user);
      await this.fillAddressZipCodeField(user);
      await this.fillSsnField(user);
    });
  }

  async clickLookupButton() {
    await this.step(`Click on 'Lookup' button`, async () => {
      await this.lookupButton.click();
    });
  }

  async submitLookupForm(user) {
    await this.step('Submit Lookup form', async () => {
      await this.fillLookupForm(user);
      await this.clickLookupButton();
    });
  }

  async fillUpdateProfileForm(user) {
    await this.step('Fill Contact Info form', async () => {
      await this.fillFirstnameField(user);
      await this.fillLastnameField(user);
      await this.fillAddressStreetField(user);
      await this.fillAddressCityField(user);
      await this.fillAddressStateField(user);
      await this.fillAddressZipCodeField(user);
      await this.fillPhoneField(user);
    });
  }

  async clickUpdateProfileButton() {
    await this.step(`Click on 'Update Profile' button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async submitUpdateProfileForm(user) {
    await this.step('Submit Update Contact Info form', async () => {
      await this.fillUpdateProfileForm(user);
      await this.clickUpdateProfileButton();
    });
  }

  // So many spikes for this
  // TODO report front-end team
  async assertFieldErrorByName(fieldKey, expectedMessage) {
    const inputLocator = this.fieldMap[fieldKey];
    const id = await inputLocator.getAttribute('id');
    if (!id) throw new Error(`No id attribute found for field "${fieldKey}"`);

    const baseId = id.replace(/^customer\./, '');
    const fullEscapedId = id.replace(/\./g, '\\.');
    const shortEscapedId = baseId.replace(/\./g, '\\.');
    const errorId = `${baseId}-error`;

    const lastSegment = baseId.split('.').pop();
    const lastSegmentErrorId = lastSegment ? `${lastSegment}-error` : null;

    const selectors = [
      `#${fullEscapedId}\\.errors`,
      `#${shortEscapedId}\\.errors`,
      `#${errorId}`,
    ];

    if (lastSegmentErrorId) {
      selectors.push(`#${lastSegmentErrorId}`);
    }

    const errorLocator = this.page.locator(selectors.join(', '));

    await this.step(
      `Assert error for '${fieldKey}' field contains: "${expectedMessage}"`,
      async () => {
        await expect(errorLocator).toHaveText(expectedMessage, {
          timeout: 5000,
        });
      },
    );
  }

  async waitUpdateContactInfoForm() {
    await this.step(`Wait until form loaded`, async () => {
      const handle = await this.addressZipCodeField.elementHandle();
      await this.page.waitForFunction(el => el.value.trim() !== '', handle);
    });
  }

  async assertCheckProfileFields(user) {
    await this.step(`Wait until form loaded`, async () => {
      await this.waitUpdateContactInfoForm();
    });
    await this.step('Verify Contact Info form fields', async () => {
      await expect(this.firstNameField).toHaveValue(user.firstName);
      await expect(this.lastNameField).toHaveValue(user.lastName);
      await expect(this.addressStreetField).toHaveValue(user.address);
      await expect(this.addressCityField).toHaveValue(user.city);
      await expect(this.addressStateField).toHaveValue(user.state);
      await expect(this.addressZipCodeField).toHaveValue(user.zipCode);
      await expect(this.phoneNumberField).toHaveValue(user.phoneNumber);
    });
  }
}
