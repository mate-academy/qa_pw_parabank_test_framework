import { BasePage } from './basePage';
import { expect } from '../../helpers/pwHelpers';

export class UpdateContactPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'https://parabank.parasoft.com/parabank/updateprofile.htm';
  }

  async open() {
    await super.open(this.url);
  }

  async fillContactForm(data) {
    await this.step(`Fill contact info form`, async () => {
      await this.page.fill('input[name="customer.address.street"]', data.address);
      await this.page.fill('input[name="customer.address.city"]', data.city);
      await this.page.fill('input[name="customer.address.state"]', data.state);
      await this.page.fill('input[name="customer.address.zipCode"]', data.zip);
      await this.page.fill('input[name="customer.phoneNumber"]', data.phone);
    });
  }

  async submit() {
    await this.step(`Submit contact info update`, async () => {
      await this.page.click('input[value="Update Profile"]');
    });
  }

  async verifyContactUpdateSuccess() {
    await this.step(`Verify contact info update success`, async () => {
      await expect(this.page.locator('#rightPanel')).toContainText('Profile Updated');
    });
  }
}
