import { expect, testStep } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.textYourAccountWasCreated = page.getByText('Your account was created');
    this.logOutButton = page.getByRole('link', { name: 'Log Out' });
    this.OpenNewAccountButton = page.getByRole('link', {
      name: 'Open New Account',
    });
    this.requestLoanButton = page.getByRole('link', { name: 'Request Loan' });
    this.transferFundsButton = page.getByRole('link', {
      name: 'Transfer Funds',
    });
    this.accountOverviewButton = page.getByRole('link', {
      name: 'Accounts Overview',
    });
    this.updateContactInfoButton = page.getByRole('link', {
      name: 'Update Contact Info',
    });
    this.TextUpdateInfo = page.getByRole('heading', { name: 'Update Profile' });
    this.findTransactionButton = page.getByRole('link', {
      name: 'Find Transactions',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertYourAccountWasCreated() {
    await this.step(`Assert Your account was created `, async () => {
      await expect(this.textYourAccountWasCreated).toBeVisible();
    });
  }
  async assertAcountServiseIsVisible(page2) {
    await this.step(`Assert sing in test is positive`, async () => {
      await expect(
        page2.getByRole('heading', { name: 'Account Services' }),
      ).toBeVisible();
    });
  }
  async clickLogOutButton() {
    await this.step(`Click ;ogout Button`, async () => {
      await this.logOutButton.click();
    });
  }
  async clickOpenNewAccountButton() {
    await this.step(`Click Open New Account Button`, async () => {
      await this.OpenNewAccountButton.click();
    });
  }
  async clickRequestLoanButton() {
    await this.step(`Click request loan button`, async () => {
      await this.requestLoanButton.click();
    });
  }
  async clickTransferFundsButton() {
    await this.step(`Click transfer funds button`, async () => {
      await this.transferFundsButton.click();
    });
  }
  async clickAccountsOverviewButton() {
    await this.step(`Click Accounts Overview button`, async () => {
      await this.accountOverviewButton.click();
    });
  }
  async clickBillPayButton(page = this.page) {
    await this.step(`Click Bill Pay button`, async () => {
      await page.getByRole('link', { name: 'Bill Pay' }).click();
      await expect(
        page.getByRole('heading', { name: 'Bill Payment Service' }),
      ).toBeVisible();
    });
  }
  async clickUpdateContactInfoButton() {
    await this.step(`Click update contact info button`, async () => {
      await this.updateContactInfoButton.click();
      await expect(this.TextUpdateInfo).toBeVisible();
    });
  }
  async clickFindTransactionButton() {
    await this.step(`Click find transaction button`, async () => {
      await this.findTransactionButton.click();
    });
  }
}
