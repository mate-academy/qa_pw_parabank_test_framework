import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { SIGN_UP_FIELDS } from '../../constants/signUpFields';

export class SignUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.repeatPasswordField = page.locator('#repeatedPassword');
    this.signUpButton = page.getByRole('button', { name: 'Register' });
  }

  repeatedPasswordError() {
    return this.page.locator(
      `[id="${SIGN_UP_FIELDS.REPEATED_PASSWORD}.errors"]`,
    );
  }

  errors(message) {
    if (message === SIGN_UP_FIELDS.REPEATED_PASSWORD) {
      return this.repeatedPasswordError();
    }
    return this.page.locator(`[id="customer.${message}.errors"]`);
  }

  field(name) {
    if (name === SIGN_UP_FIELDS.REPEATED_PASSWORD) {
      return this.repeatPasswordField;
    }

    return this.page.locator(`[id="customer.${name}"]`);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto('parabank/register.htm');
    });
  }

  async fillRepeatPasswordField(repeatPassword) {
    await this.step(`Fill the 'RepeatPassword' field`, async () => {
      await this.repeatPasswordField.fill(repeatPassword);
    });
  }

  fillField(name, value) {
    return this.step(`Fill the '${name}' field`, async () => {
      await this.field(name).fill(value);
    });
  }

  async clickSignUpButton() {
    await this.step(`Click the 'Sign up' button`, async () => {
      await this.signUpButton.click();
    });
  }

  async fillSignUpForm(user) {
    await this.step(`Fill the 'Sign up' form`, async () => {
      await this.fillField(SIGN_UP_FIELDS.FIRST_NAME, user.firstName);
      await this.fillField(SIGN_UP_FIELDS.LAST_NAME, user.lastName);
      await this.fillField(SIGN_UP_FIELDS.ADDRESS_STREET, user.addressStreet);
      await this.fillField(SIGN_UP_FIELDS.ADDRESS_CITY, user.addressCity);
      await this.fillField(SIGN_UP_FIELDS.ADDRESS_STATE, user.addressState);
      await this.fillField(
        SIGN_UP_FIELDS.ADDRESS_ZIP_CODE,
        user.addressZipCode,
      );
      await this.fillField(SIGN_UP_FIELDS.PHONE_NUMBER, user.phoneNumber);
      await this.fillField(SIGN_UP_FIELDS.SSN, user.snn);
      await this.fillField(SIGN_UP_FIELDS.USERNAME, user.username);
      await this.fillField(SIGN_UP_FIELDS.PASSWORD, user.password);

      await this.fillRepeatPasswordField(user.password);
    });
  }

  async fillEmptyNegativeSignUpForm(user, emptyField) {
    const fields = {
      [SIGN_UP_FIELDS.FIRST_NAME]: user.firstName,

      [SIGN_UP_FIELDS.LAST_NAME]: user.lastName,

      [SIGN_UP_FIELDS.ADDRESS_STREET]: user.addressStreet,

      [SIGN_UP_FIELDS.ADDRESS_CITY]: user.addressCity,

      [SIGN_UP_FIELDS.ADDRESS_STATE]: user.addressState,

      [SIGN_UP_FIELDS.ADDRESS_ZIP_CODE]: user.addressZipCode,

      [SIGN_UP_FIELDS.PHONE_NUMBER]: user.phoneNumber,

      [SIGN_UP_FIELDS.SSN]: user.snn,

      [SIGN_UP_FIELDS.USERNAME]: user.username,

      [SIGN_UP_FIELDS.PASSWORD]: user.password,

      [SIGN_UP_FIELDS.REPEATED_PASSWORD]: user.password,
    };

    for (const [field, value] of Object.entries(fields)) {
      await this.fillField(
        field,

        field === emptyField ? '' : value,
      );
    }
  }

  async assertErrorMessageContainsText(field, messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errors(field)).toContainText(messageText);
    });
  }
}
