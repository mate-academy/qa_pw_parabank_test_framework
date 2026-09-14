import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class UpdateProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });
    this.profileUpdatedMessage = page.getByRole('heading', {
      name: 'Profile Updated',
    });
  }

  field(name) {
    return this.page.locator(`[id="customer.${name}"]`);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  fillField(name, value) {
    return this.step(`Fill the '${name}' field`, async () => {
      await this.field(name).fill(value);
    });
  }

  async clickUpdateProfileButton() {
    await this.step(`Click the 'Update Profile' button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertProfileUpdatedMessage() {
    await this.step(`Assert 'Profile Updated' message`, async () => {
      await expect(this.profileUpdatedMessage).toBeVisible();
    });
  }

  async assertUpdatedValue(name, value) {
    await this.step(`Assert 'Profile Updated' message`, async () => {
      await expect(this.field(name)).toHaveValue(value);
    });
  }
}
