import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountServicesNavPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.openNewAccountLink = page.getByRole('link', {
      name: 'Open New Account',
    });
    this.accountsOverviewLink = page.getByRole('link', {
      name: 'Accounts Overview',
    });
    this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
    this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
    this.findTransactionsLink = page.getByRole('link', {
      name: 'Find Transactions',
    });
    this.updateContactInfoLink = page.getByRole('link', {
      name: 'Update Contact Info',
    });
    this.requestLoanLink = page.getByRole('link', { name: 'Request Loan' });
    this.logOutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickOpenNewAccount() {
    await this.step(`Click the 'Open New Account' link`, async () => {
      await this.openNewAccountLink.click();
    });
  }

  async clickAccountsOverview() {
    await this.step(`Click the 'Accounts Overview' link`, async () => {
      await this.accountsOverviewLink.click();
    });
  }

  async clickTransferFunds() {
    await this.step(`Click the 'Transfer Funds' link`, async () => {
      await this.transferFundsLink.click();
    });
  }

  async clickBillPay() {
    await this.step(`Click the 'Bill Pay' link`, async () => {
      await this.billPayLink.click();
    });
  }

  async clickFindTransactions() {
    await this.step(`Click the 'Find Transactions' link`, async () => {
      await this.findTransactionsLink.click();
    });
  }

  async clickUpdateContactInfo() {
    await this.step(`Click the 'Update Contact Info' link`, async () => {
      await this.updateContactInfoLink.click();
    });
  }

  async clickRequestLoan() {
    await this.step(`Click the 'Request Loan' link`, async () => {
      await this.requestLoanLink.click();
    });
  }

  async clickLogOutLink() {
    await this.step(`Click the 'Log Out' link`, async () => {
      await this.logOutLink.click();
    });
  }

  async assertLogOutLinkIsVisible() {
    await this.step(`Assert the 'Log Out' link is visible`, async () => {
      await expect(this.logOutLink).toBeVisible();
    });
  }
}
