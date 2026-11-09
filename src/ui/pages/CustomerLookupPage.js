import * as allure from 'allure-js-commons';
import { expect } from 'allure-playwright';

export class CustomerLookupPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async step(title, stepToRun) {
    return await allure.step(title, stepToRun);
  }

  async fillFirstNameField(user, page = this.page) {
    await this.step('Fill first name field', async () => {
      await page.locator('#firstName').fill(user.firstName);
    });
  }
  async fillLastNameField(user, page = this.page) {
    await this.step('Fill last name field', async () => {
      await page.locator('#lastName').fill(user.lastName);
    });
  }
  async fillAddressField(user, page = this.page) {
    await this.step('Fill address field', async () => {
      await page.locator('[id="address\\.street"]').fill(user.address);
    });
  }
  async fillCityField(user, page = this.page) {
    await this.step('Fill city field', async () => {
      await page.locator('[id="address\\.city"]').fill(user.city);
    });
  }
  async fillStatefield(user, page = this.page) {
    await this.step('Fill state field', async () => {
      await page.locator('[id="address\\.state"]').fill(user.state);
    });
  }
  async fillZipCodeField(user, page = this.page) {
    await this.step('Fill zip code field', async () => {
      await page.locator('[id="address\\.zipCode"]').fill(user.zipCode);
    });
  }
  async fillSsnField(user, page = this.page) {
    await this.step('Fill SSN field', async () => {
      await page.locator('#ssn').fill(user.ssn);
    });
  }
  async clickFindLoginButton(page = this.page) {
    await this.step('Click find my login info button', async () => {
      await page.getByRole('button', { name: 'Find My Login Info' }).click();
    });
  }
  async assertErrorMessageEmptyField(expectedText) {
    await this.step(`Asert error mesages`, async () => {
      await expect(this.page.getByText(expectedText)).toBeVisible();
    });
  }
  async assertLoginInformationMessage(page = this.page) {
    await this.step(`Assert user information`, async () => {
      await expect(page.getByText('Your login information was')).toBeVisible();
    });
  }
}
