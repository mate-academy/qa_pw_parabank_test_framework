import { expect, testStep  } from '../../../common/helpers/pwHelpers';

export class OpenNewAccountPage{
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
    this.dropDownLocator = page.locator('#type');
    this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
    this.accountOpenedMessage = page.getByRole('heading', { name: 'Account Opened!' });
    this.fromAccountId =page.locator('#fromAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Open New Account' page`, async () => {
      await this.page.goto('openaccount.htm');
    });
  }
  

  async selectCheckingTypeOfAccount() {
    await this.step(`Select the 'CHECKING' type of new account`, async () => {
      await this.dropDownLocator.selectOption('CHECKING');
    });
  }

  async clickOpenNewAccountLink() {
    await this.step(`Click the 'Open New Account' link`, async () => {
      await this.openNewAccountLink.click();
    });
  }

   async clickOpenNewAccountButton() {
    await this.step(`Click the 'Open New Account' button`, async () => {
      await this.openNewAccountButton.click();
    });
  }

  async assertAccountOpenedMessage() {
    await this.step(`Assert the 'Account Opened!' is visible`, async () => {
      await expect(this.accountOpenedMessage).toBeVisible();
    });
  }

  async selectFromAccountIdOption(mainAccountNumber) {
      await this.step(`Select 'From Account Id' option`, async() => {
        await this.fromAccountId.selectOption({ value: String(mainAccountNumber) });
    });
  }

  
}