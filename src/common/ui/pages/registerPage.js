import { BasePage } from './basePage';
import { expect } from '../../helpers/pwHelpers';

export class RegisterPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'https://parabank.parasoft.com/parabank/register.htm';
  }

  async open() {
    await super.open(this.url);
  }

  async fillRegistrationForm(user) {
    await this.step(`Fill registration form`, async () => {
      await this.page.fill('input[name="customer.firstName"]', user.firstName);
      await this.page.fill('input[name="customer.lastName"]', user.lastName);
      await this.page.fill('input[name="customer.address.street"]', user.address);
      await this.page.fill('input[name="customer.address.city"]', user.city);
      await this.page.fill('input[name="customer.address.state"]', user.state);
      await this.page.fill('input[name="customer.address.zipCode"]', user.zip);
      await this.page.fill('input[name="customer.phoneNumber"]', user.phone);
      await this.page.fill('input[name="customer.ssn"]', user.ssn);
      await this.page.fill('input[name="customer.username"]', user.username);
      await this.page.fill('input[name="customer.password"]', user.password);
      await this.page.fill('input[name="repeatedPassword"]', user.password);
    });
  }

  async submit() {
    await this.step(`Submit registration form`, async () => {
      await this.page.click('input[value="Register"]');
    });
  }

  async verifyRegistrationSuccess() {
    await this.step(`Verify registration success`, async () => {
      await expect(this.page.locator('#rightPanel')).toContainText('Your account was created successfully');
    });
  }
}
