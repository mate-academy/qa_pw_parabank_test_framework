import * as allure from 'allure-js-commons';
import { expect } from 'allure-playwright';

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.selectOptionTypeAccount = page.locator('#type');
    this.openNewAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });
    this.newAccountMessage = page.getByText('Congratulations, your account');
    this.selectOptionIdAccount = page.locator('#fromAccountId');
  }

  async step(title, stepToRun) {
    return await allure.step(title, stepToRun);
  }

  async selectTypeChecking() {
    await this.step('Select account type CHECKING', async () => {
      await this.selectOptionTypeAccount.selectOption({ index: 0 });
    });
  }

  async selectTypeSavings() {
    await this.step('Select account type SAVINGS', async () => {
      await this.selectOptionTypeAccount.selectOption({ index: 1 });
    });
  }

  async clickOpenNewAccountButton() {
    await this.step('Click Open new Account button', async () => {
      await this.openNewAccountButton.click();
    });
  }

  async assertOpenNewAccountMessageText() {
    await this.step(
      'Assert text Congratulations, your account open',
      async () => {
        await expect(this.newAccountMessage).toBeVisible();
      },
    );
  }

  async waitForURL() {
    await this.step('Wait for Open New Account URL', async () => {
      await this.page.waitForURL(
        'https://parabank.parasoft.com/parabank/openaccount.htm',
      );
    });
  }

  async clickSelectOptionIdAccount() {
    await this.step('Select first account in From account list', async () => {
      await this.selectOptionIdAccount.selectOption({ index: 0 });
    });
  }

  async clickSelectOptionIdAnotherAccount() {
    await this.step('Select second account in From account list', async () => {
      await this.selectOptionIdAccount.selectOption({ index: 1 });
    });
  }
}
