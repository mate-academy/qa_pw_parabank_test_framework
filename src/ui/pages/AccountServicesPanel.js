import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountServicesPanel {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    // Left Panel
    this.leftPanel = page.locator('#leftPanel');

    this.welcomeText = this.leftPanel.locator('p.smallText');
    this.accountServicesHeader = this.leftPanel.locator('h2', {
      hasText: 'Account Services',
    });

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
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickLogOutButton() {
    await this.step(`Click on 'Log Out' button`, async () => {
      await this.logoutLink.waitFor({ state: 'visible' });
      await this.logoutLink.click();
    });
  }

  async clickOpenNewAccountLink() {
    await this.step(`Click on 'Open New Account' button`, async () => {
      await this.openNewAccountLink.waitFor({ state: 'visible' });
      await this.openNewAccountLink.click();
    });
  }

  async clickUpdateContactInfoLink() {
    await this.step(`Click on 'Update Contact Info' button`, async () => {
      await this.updateContactInfoLink.click();
    });
  }

  async clickAccountsOverviewLink() {
    await this.step(`Click on 'Accounts Overview' button`, async () => {
      await this.accountsOverviewLink.click();
    });
  }

  async clickTransferFundsLink() {
    await this.step(`Click on 'Transfer Funds' button`, async () => {
      await this.transferFundsLink.click();
    });
  }

  async clickFindTransactionsLink() {
    await this.step(`Click on 'Find Transactions' button`, async () => {
      await this.findTransactionsLink.click();
    });
  }

  async clickRequestLoanLink() {
    await this.step(`Click on 'Request Loan' button`, async () => {
      await this.requestLoanLink.click();
    });
  }

  async clickBillPayLink() {
    await this.step(`Click on 'Bill Pay' button`, async () => {
      await this.page
        .getByRole('link', { name: 'Bill Pay' })
        .waitFor({ state: 'visible' });
      await this.page.getByRole('link', { name: 'Bill Pay' }).click();
    });
  }

  async assertWelcomeMessageIncludesUser(user) {
    await this.step(
      `Log In welcome message has correct user first/last name`,
      async () => {
        const text = `Welcome ${user.firstName} ${user.lastName}`;
        await this.welcomeText.waitFor({ state: 'visible' });
        await expect(this.welcomeText).toContainText(text);
      },
    );
  }
}
