import { expect, testStep } from '../../common/helpers/pwHelpers';

export class OpenNewAccountPage{
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountTypeDropdown = page.locator('#type');
    this.existingAccountDropdown = page.locator('#fromAccountId');
    this.newAccountNumber = page.locator('#openAccountResult p a');
    this.welcomeText = page.locator('#openAccountResult p').first();
    this.openNewAccountButton = page.getByRole('button', {name: 'Open New Account'});
    this.openNewAccountLink = page.getByRole('link', {name: 'Open New Account'});
    this.newAccountId = page.locator('#openAccountResult p a');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async getAccountNumber() {
    return await this.newAccountId.textContent();
  }

  async clickNewAccountNumberLink() {
    await this.step(`click new account link`, async () => {
      await this.newAccountId.click();
    });
  }

  async clickOpenAccountLink() {
    await this.step(`click open account link`, async () => {
      await this.openNewAccountLink.click();
    });
  }

  async open() {
    await this.step(`Open 'New account' page`, async () => {
      await this.page.goto('openaccount.htm');
    });
  }

  async selectOptionFromAccountTypeDropdown(option) {
    await this.step(`select ${option} from account type dropdown`, async () => {
      await this.accountTypeDropdown.selectOption(option);
    });
  }

  async selectOptionFromExistingAccounts(option) {
    await this.step(`select ${option} from list of existing accounts`, async () => {
      await this.existingAccountDropdown.selectOption(option.toString());
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`click open New Account Button`, async () => {
      await this.openNewAccountButton.click();
    });
  }

  async assertAccountNumberIsVisible(number) {
    await this.step(`assert account number is visible`, async () => {
      await expect(this.newAccountNumber).toContainText(number);
    });
  }

  async assertWelcomeText(text) {
    await this.step(`assert welcome text`, async () => {
      await expect(this.welcomeText).toContainText(text);
    });
  }
}
