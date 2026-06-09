import { testStep } from '../../common/helpers/pwHelpers';
import { expect } from '@playwright/test';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.loginPanel = page.locator('#loginPanel');
    this.accountServicesPanel = page.locator('#leftPanel');
    this.usernameField = this.loginPanel.locator('input[name="username"]');
    this.passwordField = this.loginPanel.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.forgotLoginInfoLink =
      this.accountServicesPanel.getByText('Forgot login info?');
    this.accountOverviewLink =
      this.accountServicesPanel.getByText('Accounts Overview');
    this.openAccountLink =
      this.accountServicesPanel.getByText('Open New Account');
    this.billPayLink = this.accountServicesPanel.getByText('Bill Pay');
    this.logoutLink = page.getByText('Log out');
    this.updateContactInfoLink = this.accountServicesPanel.getByText(
      'Update Contact Info',
    );
    this.requestLoanLink = this.accountServicesPanel.getByText('Request Loan');
    this.transferFundsLink = this.accountServicesPanel.getByText('Transfer' +
      ' Funds');
    this.findTransactionsLink =
      this.accountServicesPanel.getByText('Find Transactions');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Register page`, async () => {
      await this.page.goto('/');
    });
  }

  async fillUsernameField(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLoginButton() {
    await this.step(`Click on Login button`, async () => {
      await this.loginButton.click();
    });
  }

  async clickForgotLoginInfoLink() {
    await this.step(`Click on 'Forgot login info?' link`, async () => {
      await this.forgotLoginInfoLink.click();
    });
  }

  async clickOpenAccountLink() {
    await this.step(`Click on 'Open New Account' link`, async () => {
      await this.openAccountLink.click();
    });
  }

  async clickTransferFundsLink() {
    await this.step(`Click on 'Transfer Funds' link`, async () => {
      await this.transferFundsLink.click();
    });
  }

  async clickBillPayLink() {
    await this.step(`Click on 'Pay Bill' link`, async () => {
      await this.billPayLink.click();
    });
  }

  async clickAccountOverviewLink() {
    await this.step(`Click on Account Overview link`, async () => {
      await this.accountOverviewLink.click();
    });
  }

  async clickRequestLoanLink() {
    await this.step(`Click on 'Request Loan' link`, async () => {
      await this.requestLoanLink.click();
    });
  }

  async clickFindTransactionsLink() {
    await this.step(`Click on 'Find Transactions' link`, async () => {
      await this.findTransactionsLink.click();
    });
  }

  async clickLogoutLink() {
    await this.step(`Click on 'Log out' link`, async () => {
      await this.logoutLink.click();
    });
  }

  async clickUpdateContactInfoLink() {
    await this.step(`Click on 'Update Contact Info' link`, async () => {
      await this.updateContactInfoLink.click();
    });
  }

  async assertWelcomeTextVisible(firstName, lastName) {
    await this.step(`Assert that welcome text is visible`, async () => {
      await expect(
        this.page.getByText(`Welcome ${firstName} ${lastName}`),
      ).toBeVisible();
    });
  }

  async assertLoginPanelVisible() {
    await this.step(`Assert that login panel is visible`, async () => {
      await expect(this.loginPanel).toBeVisible();
    });
  }
}
